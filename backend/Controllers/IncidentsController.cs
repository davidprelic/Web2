using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs;
using backend.Entities;
using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class IncidentsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public IncidentsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<IncidentDto>> CreateIncident(IncidentDto incidentDto)
        {
            var incident = _mapper.Map<Incident>(incidentDto);

            Resolution resol = new Resolution();
            _unitOfWork.ResolutionRepository.AddResolution(resol);
            await _unitOfWork.ResolutionRepository.SaveAllAsync();

            incident.Status = "Active";
            incident.ResolutionId = resol.Id;

            _unitOfWork.IncidentRepository.AddIncident(incident);
            if (await _unitOfWork.IncidentRepository.SaveAllAsync()) return Ok(_mapper.Map<IncidentDto>(incident));

            return BadRequest("Failed to add incident");

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Incident>>> GetIncidents()
        {
            var incidents = await _unitOfWork.IncidentRepository.GetIncidentsAsync();

            var finalIncidents = _mapper.Map<List<IncidentDto>>(incidents);

            return Ok(finalIncidents);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Incident>> GetIncident(int id)
        {
            var incident = await _unitOfWork.IncidentRepository.GetIncidentByIdAsync(id);

            return Ok(_mapper.Map<Incident>(incident));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateIncident(IncidentDto incidentUpdateDto)
        {
            var incident = await _unitOfWork.IncidentRepository.GetIncidentByIdAsync(incidentUpdateDto.Id);

            incidentUpdateDto.ResolutionId = incident.ResolutionId;
            
            _mapper.Map(incidentUpdateDto, incident);

            _unitOfWork.IncidentRepository.Update(incident);

            if (await _unitOfWork.IncidentRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update incident");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteIncident(int id)
        {
            var incident = await _unitOfWork.IncidentRepository.GetIncidentByIdAsync(id);

            _unitOfWork.IncidentRepository.DeleteIncident(incident);

            if (await _unitOfWork.IncidentRepository.SaveAllAsync()) return Ok();

            return BadRequest("Problem with deleting incident");
        }


    }
}