using AutoMapper;
using backend.DTOs;
using backend.Entities;
using backend.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    public class WorkPlanController : BaseApiController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        public WorkPlanController(IUnitOfWork uow, IMapper mapper, UserManager<User> userManager)
        {
            _userManager = userManager;
            this.uow = uow;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkPlan>>> GetAsync()
        {
            var workplans = await uow.WorkPlanRepository.GetWorkPlanAsync();

            var finalWorkPlans = _mapper.Map<List<WorkPlanDto>>(workplans);
            return Ok(finalWorkPlans);
        }

        [HttpPost("{username}")]
        public async Task<ActionResult<WorkPlanDto>> AddWorkPlan(WorkPlanDto workPlanDto, string username)
        {
            int? crewId = null;
            int? workRequestId = null;
            int? incId = null;

            if (workPlanDto.CrewId != 0)
            {
                crewId = workPlanDto.CrewId;
            }

            if (workPlanDto.WorkRequestId != 0)
            {
                workRequestId = workPlanDto.WorkRequestId;
            }

            if (workPlanDto.IncidentId != 0)
            {
                incId = workPlanDto.IncidentId;
            }
            //Dodaj Crewid, workRequestid i incidentid
            var workPlan = new WorkPlan
            {
                Type = workPlanDto.Type,
                Status = workPlanDto.Status,
                Address = workPlanDto.Address,
                Longitude = workPlanDto.Longitude,
                Latitude = workPlanDto.Latitude,
                StartDateTime = workPlanDto.StartDateTime,
                EndDateTime = workPlanDto.EndDateTime,
                Purpose = workPlanDto.Purpose,
                Notes = workPlanDto.Notes,
                Company = workPlanDto.Company,
                PhoneNumber = workPlanDto.PhoneNumber,
                WorkRequestId = workRequestId,
                CrewId = crewId,
                IncidentId = incId
            };
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username.ToLower());

            workPlan.CreatedBy = temp.Id;

            workPlan.DateTimeCreated = DateTime.Now;
            uow.WorkPlanRepository.AddWorkPlan(workPlan);

            if (await uow.SaveAsync())
            {
                await uow.NotificationRepository.NewNotification(new Notification()
                {
                    Type = "Success",
                    Content = "You created new work plan: " + workPlan.Id,
                    DateTimeCreated = DateTime.Now,
                }, temp.Id);
                return Ok(_mapper.Map<WorkPlanDto>(workPlan));
            }

            return BadRequest("Failed to add work plan");
        }

        [HttpDelete("{id}/{username}")]
        public async Task<IActionResult> DeleteWorkPlan(int id, string username)
        {
            var workPlan = await uow.WorkPlanRepository.GetWorkPlanByIdAsync(id);

            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username.ToLower());

            var safetyDocs = await uow.SafetyDocRepository.GetSafetyDocsAsync();

            foreach (var item in safetyDocs)
            {
                if (item.WorkPlanId == workPlan.Id)
                {
                    item.WorkPlanId = null;
                    uow.SafetyDocRepository.Update(item);
                }
            }

            uow.WorkPlanRepository.DeleteWorkPlan(workPlan);
            if (await uow.SaveAsync())
            {
                await uow.NotificationRepository.NewNotification(new Notification()
                {
                    Type = "Warning",
                    Content = "You deleted work plan: " + workPlan.Id,
                    DateTimeCreated = DateTime.Now,
                }, temp.Id);
                return Ok();
            }
            return BadRequest("Problem with deleting work plan");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkPlanDto>> GetWorkPlan(int id)
        {
            var workPlan = await uow.WorkPlanRepository.GetWorkPlanByIdAsync(id);
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.Id == workPlan.CreatedBy);


            WorkPlanDto finalWorkPlan = _mapper.Map<WorkPlanDto>(workPlan);
            finalWorkPlan.CreatedBy = temp.UserName;
            return Ok(finalWorkPlan);
        }

        [HttpPut("{username}")]
        public async Task<IActionResult> UpdateWorkPlan(WorkPlanDto workPlanDto, string username)
        {
            var workPlan = await uow.WorkPlanRepository.GetWorkPlanByIdAsync(workPlanDto.Id);

            int? crewId = null;
            int? workRequestId = null;
            int? incId = null;

            if (workPlanDto.CrewId != 0)
            {
                crewId = workPlanDto.CrewId;
            }

            if (workPlanDto.WorkRequestId != 0)
            {
                workRequestId = workPlanDto.WorkRequestId;
            }

            if (workPlanDto.IncidentId != 0)
            {
                incId = workPlanDto.IncidentId;
            }
            //Dodaj Crewid, workRequestid i incidentid
            workPlan.Type = workPlanDto.Type;
            workPlan.Status = workPlanDto.Status;
            workPlan.Address = workPlanDto.Address;
            workPlan.Longitude = workPlanDto.Longitude;
            workPlan.Latitude = workPlanDto.Latitude;
            workPlan.StartDateTime = workPlanDto.StartDateTime;
            workPlan.EndDateTime = workPlanDto.EndDateTime;
            workPlan.Purpose = workPlanDto.Purpose;
            workPlan.Notes = workPlanDto.Notes;
            workPlan.Company = workPlanDto.Company;
            workPlan.PhoneNumber = workPlanDto.PhoneNumber;
            workPlan.WorkRequestId = workPlanDto.WorkRequestId;
            workPlan.CrewId = workPlanDto.CrewId;
            workPlan.IncidentId = workPlanDto.IncidentId;

            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username.ToLower());

            uow.WorkPlanRepository.Update(workPlan);
            if (await uow.SaveAsync())
            {
                await uow.NotificationRepository.NewNotification(new Notification()
                {
                    Type = "Success",
                    Content = "You changed work plan: " + workPlan.Id,
                    DateTimeCreated = DateTime.Now,
                }, temp.Id);
                return NoContent();
            }

            return BadRequest("Failed to update work plan");
        }
    }
}
