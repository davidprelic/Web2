using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs;
using backend.Entities;
using backend.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class IncidentsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        public IncidentsController(IUnitOfWork unitOfWork, IMapper mapper, UserManager<User> userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<ActionResult<IncidentDto>> CreateIncident(IncidentDto incidentDto)
        {
            User temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == incidentDto.CreatedById.ToLower());
            incidentDto.CreatedById = null;

            var incident = _mapper.Map<Incident>(incidentDto);

            incident.CreatedById = temp.Id;

            var activeIncidents = await _unitOfWork.IncidentRepository.GetActiveIncidentsAsync();

            foreach (var inc in activeIncidents)
            {
                if (inc.Location == incidentDto.Location)
                {
                    return BadRequest("Failed to add incident, incident on that location already exist!");
                }
            }

            Resolution resol = new Resolution();
            _unitOfWork.ResolutionRepository.AddResolution(resol);
            await _unitOfWork.ResolutionRepository.SaveAllAsync();

            incident.Status = "Draft";
            incident.ResolutionId = resol.Id;
            incident.NumberOfCalls = 0;

            _unitOfWork.IncidentRepository.AddIncident(incident);

            if (await _unitOfWork.IncidentRepository.SaveAllAsync()) 
            {
                incident.CreatedById = null;

                IncidentDto finalIncDto = _mapper.Map<IncidentDto>(incident);
                finalIncDto.CreatedById = temp.UserName;

                return Ok(finalIncDto);
            }

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
        public async Task<ActionResult<IncidentDto>> GetIncident(int id)
        {
            var incident = await _unitOfWork.IncidentRepository.GetIncidentByIdAsync(id);

            var devicesByIncidentId = await _unitOfWork.DeviceRepository.GetDevicesByIncidentIdAsync(id);
            int affectedCustomers = 0;

            foreach (var dev in devicesByIncidentId)
            {
                var customers = await _unitOfWork.ConsumerRepository.GetCustomersByLocationAsync(dev.Address);
            
                affectedCustomers += customers.Count();
            }

            incident.AffectedCustomers = affectedCustomers;

            IncidentDto finalIncDto = _mapper.Map<IncidentDto>(incident);

            if (incident.CreatedById != 0)
            {
                User tempCreatedBy = await _userManager.Users.SingleOrDefaultAsync(x => x.Id == incident.CreatedById);

                finalIncDto.CreatedById = tempCreatedBy.UserName;
            }
            else
            {
                finalIncDto.CreatedById = "Random user";
            }
            
            User tempTakenToResolveUserId = null;

            if (incident.UserId != null)
            {
                tempTakenToResolveUserId = await _userManager.Users.SingleOrDefaultAsync(x => x.Id == incident.UserId);
                finalIncDto.UserId = tempTakenToResolveUserId.UserName;
            }            

            return Ok(finalIncDto);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateIncident(IncidentDto incidentUpdateDto)
        {
            var incident = await _unitOfWork.IncidentRepository.GetIncidentByIdAsync(incidentUpdateDto.Id);

            incidentUpdateDto.ResolutionId = incident.ResolutionId;
            
            User temp = null;

            if (incidentUpdateDto.UserId != null)
            {
                temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == incidentUpdateDto.UserId.ToLower());
                incidentUpdateDto.UserId = null;
            }

            User tempCreatedBy = null;

            if (incidentUpdateDto.CreatedById != "Random user")
            {
                tempCreatedBy = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == incidentUpdateDto.CreatedById.ToLower());
            }

            incidentUpdateDto.CreatedById = null;

            _mapper.Map(incidentUpdateDto, incident);

            incident.UserId = (temp != null) ? temp.Id : null;  

            incident.CreatedById = (tempCreatedBy != null) ? tempCreatedBy.Id : 0;

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

        /*[HttpGet("incidentids/{id}")]
        public async Task<List<int>> GetAllIncidentsId(int id)
        {
            var incidents = _unitOfWork.IncidentRepository.GetIncidentsIds();

            List<int> lista = new List<int>();

            foreach (var item in incidents)
            {
                if(item.inc)
            }
        }*/

    }
}