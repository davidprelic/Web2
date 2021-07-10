using System;
using System.Collections.Generic;
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
    public class CallsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        public CallsController(UserManager<User> userManager, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
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

            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.Email == callDto.Email);
            var activeIncidents = await _unitOfWork.IncidentRepository.GetActiveIncidentsAsync();

            foreach (var incident in activeIncidents)
            {
                if (incident.Location == callDto.Location)
                {
                    if (call.Email != null)
                    {
                        var callsForThisLocation = await _unitOfWork.CallRepository.GetCallsByIncidentIdAsync(incident.Id);
                        foreach (var callCheck in callsForThisLocation)
                        {
                            if (callCheck.Email == call.Email)
                            {
                                if (temp != null)
                                {
                                    await _unitOfWork.NotificationRepository.NewNotification(new Notification()
                                    {
                                        Type = "Error",
                                        Content = "There is already a call for this location " + callDto.Location +" from you",
                                        DateTimeCreated = DateTime.Now,
                                    }, temp.Id);     
                                }
                                return BadRequest("Call from this person for this incident already exists");
                            }
                        }
                    }

                    await _unitOfWork.NotificationRepository.NewNotification(new Notification()
                    {
                        Type = "Success",
                        Content = "You have reported an outage on location " + callDto.Location,
                        DateTimeCreated = DateTime.Now,
                    }, temp.Id);

                    call.IncidentId = incident.Id;
                    incident.NumberOfCalls++;
                    _unitOfWork.IncidentRepository.Update(incident);
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
                Status = "Draft",
                Location = callDto.Location,
                Latitude = callDto.Latitude,
                Longitude = callDto.Longitude,
                OutageTime = DateTime.Now,
                ResolutionId = resol.Id,
                NumberOfCalls = 1,
            };

            _unitOfWork.IncidentRepository.AddIncident(inc);
            await _unitOfWork.IncidentRepository.SaveAllAsync();

            call.IncidentId = inc.Id;

            _unitOfWork.CallRepository.AddCall(call);

            await _unitOfWork.NotificationRepository.NewNotification(new Notification()
            {
                Id = 0,
                Type = "Success",
                Content = "You have reported an outage on location " + callDto.Location,
                DateTimeCreated = DateTime.Now,
            }, temp.Id) ;

            if (await _unitOfWork.CallRepository.SaveAllAsync()) return Ok(_mapper.Map<CallDto>(call));

            return BadRequest("Failed to add call");
        }
    }
}