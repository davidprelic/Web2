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
    public class CallsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public CallsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        [HttpGet("incident/{id}")]
        public async Task<ActionResult<IEnumerable<Call>>> GetCallsByIncidentId(int id)
        {
            var calls = await _unitOfWork.CallRepository.GetCallsByIncidentIdAsync(id);

            var finalDevices = _mapper.Map<List<Call>>(calls);

            return Ok(finalDevices);
        }
        

        [HttpPost]
        public async Task<ActionResult<CallDto>> CreateCall(CallDto callDto)
        {
            var call = _mapper.Map<Call>(callDto);

            var activeIncidents = await _unitOfWork.IncidentRepository.GetActiveIncidentsAsync();

            foreach (var incident in activeIncidents)
            {
                if (incident.Location == callDto.Location)
                {
                    call.IncidentId = incident.Id;
                    _unitOfWork.CallRepository.AddCall(call);

                    if (await _unitOfWork.SaveAsync()) return Ok(_mapper.Map<CallDto>(call));
                        
                    return BadRequest("Failed to add call");
                }
            }

            Resolution resol = new Resolution();
            _unitOfWork.ResolutionRepository.AddResolution(resol);
            await _unitOfWork.ResolutionRepository.SaveAllAsync();

            Incident inc = new Incident 
            {
                isConfirmed = false,
                Status = "Active",
                Location = callDto.Location,
                Latitude = callDto.Latitude,
                Longitude = callDto.Longitude,
                OutageTime = DateTime.Now,
                ResolutionId = resol.Id
            };

            _unitOfWork.IncidentRepository.AddIncident(inc);
            await _unitOfWork.IncidentRepository.SaveAllAsync();

            call.IncidentId = inc.Id;

            _unitOfWork.CallRepository.AddCall(call);

            if (await _unitOfWork.CallRepository.SaveAllAsync()) return Ok(_mapper.Map<CallDto>(call));

            return BadRequest("Failed to add call");
        }
    }
}