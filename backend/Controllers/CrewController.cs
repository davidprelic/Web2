using AutoMapper;
using backend.DTOs;
using backend.Entities;
using backend.Helpers;
using backend.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    public class CrewController : BaseApiController
    {
        private readonly ICrewRepository crewRepository;
        private readonly IMapper mapper;

        private readonly UserManager<User> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        //private readonly IIncidentRepository incidentRepository;

        public CrewController(IUnitOfWork unitOfWork, ICrewRepository crewRepository, IMapper mapper, UserManager<User> userManager/*, IIncidentRepository incidentRepository*/)
        {
            this.crewRepository = crewRepository;
            this.mapper = mapper;
            _userManager = userManager;
            _unitOfWork = unitOfWork;
            //this.incidentRepository = incidentRepository;
        }

        [HttpPost("{username}")]
        public async Task<ActionResult<CrewDto>> CreateCrew(CreateCrewDto createCrewDto, string username)
        {
            var crew = mapper.Map<Crew>(createCrewDto);
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username);
            crewRepository.AddCrew(crew);

            if (await crewRepository.SaveAllAsync())
            {
                await _unitOfWork.NotificationRepository.NewNotification(new Notification()
                {
                    Type = "Success",
                    Content = "You added new crew named: " + crew.Name,
                    DateTimeCreated = DateTime.Now,
                }, temp.Id);

                return Ok(mapper.Map<CrewDto>(crew));
            }

            return BadRequest("Failed to add crew");
        }

        [HttpDelete("{id}/{username}")]
        public async Task<ActionResult> DeleteCrew(int id, string username)
        {
            var crew = await crewRepository.GetCrewByIdAsync(id);
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username);
            //var incidents = await incidentRepository.GetIncidentsAsync();
            //var workPlans = await _unitOfWork.WorkPlanRepository.GetWorkPlanAsync();
            //var safetyDocs = await _unitOfWork.SafetyDocRepository.GetSafetyDocsAsync();

           /* ICollection<Incident> incidents1 = new List<Incident>();
            foreach (var item in incidents)
            {
                if (item.CrewId == id)
                {
                    item.CrewId = null;
                    incidents1.Add(item);
                }
            }*/

            /*foreach (var item in incidents1)
            {
                incidentRepository.Update(item);
            }*/

            /*foreach (var item in workPlans)
            {
                if(item.CrewId == id)
                {
                    item.CrewId = null;
                    _unitOfWork.WorkPlanRepository.Update(item);
                }
            }

            foreach (var item in safetyDocs)
            {
                if (item.CrewId == id)
                {
                    item.CrewId = null;
                    _unitOfWork.SafetyDocRepository.Update(item);
                }
            }*/


            ICollection<User> users = new List<User>();

            foreach (var item in _userManager.Users)
            {
                if (item.CrewId == id)
                {
                    item.CrewId = null;
                    users.Add(item);
                }
            }

            foreach (var item in users)
            {
                await _userManager.UpdateAsync(item);
            }

            crewRepository.DeleteCrew(crew);
            /*if (await incidentRepository.SaveAllAsync())
            {*/
            if (await crewRepository.SaveAllAsync() /*&& await _unitOfWork.WorkPlanRepository.SaveAllAsync() && await _unitOfWork.SafetyDocRepository.SaveAllAsync()*/)
            {
                await _unitOfWork.NotificationRepository.NewNotification(new Notification()
                {
                    Type = "Info",
                    Content = "You deleted crew: " + crew.Name,
                    DateTimeCreated = DateTime.Now,
                }, temp.Id);

                return Ok();
            }
            //}

            return BadRequest("Problem with deleting crew");
        }

        [HttpPut("{username}")]
        public async Task<ActionResult> UpdateCrew(CrewDto crewDto, string username)
        {
            var crew = await crewRepository.GetCrewByIdAsync(crewDto.Id);
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username);

            mapper.Map(crewDto, crew);

            crewRepository.UpdateCrew(crew);

            if (await crewRepository.SaveAllAsync())
            {
                await _unitOfWork.NotificationRepository.NewNotification(new Notification()
                {
                    Type = "Success",
                    Content = "You updated crew: " + crew.Name,
                    DateTimeCreated = DateTime.Now,
                }, temp.Id);

                return NoContent();
            }

            return BadRequest("Failed to update crew");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CrewDto>>> GetCrews()
        {
            var crews = await crewRepository.GetCrewsAsync();

            var finalCrews = mapper.Map<List<CrewDto>>(crews);

            return Ok(finalCrews);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CrewDto>> GetCrew(int id)
        {
            var crew = await crewRepository.GetCrewByIdAsync(id);

            return Ok(mapper.Map<CrewDto>(crew));
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Crew>>> GetCrewsSearch([FromQuery] CrewSearchParameters crewSearch)
        {
            var crews = await crewRepository.GetCrewsAsync();

            if (!String.IsNullOrWhiteSpace(crewSearch.Name))
                crews = crews.Where(c => c.Name.ToLower().Contains(crewSearch.Name.Trim().ToLower()));

            var finalCrews = mapper.Map<List<CrewDto>>(crews);

            return Ok(finalCrews);
        }
    }
}
