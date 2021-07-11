using AutoMapper;
using backend.DTOs;
using backend.Entities;
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
    public class WorkRequestController : BaseApiController
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public WorkRequestController(IUnitOfWork uow, IMapper mapper, UserManager<User> userManager)
        {
            this.unitOfWork = uow;
            this._mapper = mapper;
            this._userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkRequest>>> GetWorkRequests()
        {
            var workRequests = await unitOfWork.WorkRequestRepository.GetWorkRequestsAsync();

            var finalWorkRequests = _mapper.Map<List<WorkRequestDto>>(workRequests);
            return Ok(finalWorkRequests);
        }

        [HttpPost("{username}")]
        public async Task<ActionResult<WorkRequestDto>> CreateWorkRequest(WorkRequestDto workRequestDto, string username)
        {
            int? incId = null;

            if (workRequestDto.IncidentId != 0)
            {
                incId = workRequestDto.IncidentId;
            }

            var workRequest = new WorkRequest
            {
                Type = workRequestDto.Type,
                Status = workRequestDto.Status,
                Address = workRequestDto.Address,
                Longitude = workRequestDto.Longitude,
                Latitude = workRequestDto.Latitude,
                StartDateTime = workRequestDto.StartDateTime,
                EndDateTime = workRequestDto.EndDateTime,
                Purpose = workRequestDto.Purpose,
                Notes = workRequestDto.Notes,
                EmergencyWork = workRequestDto.EmergencyWork,
                Company = workRequestDto.Company,
                PhoneNumber = workRequestDto.PhoneNumber,
                IncidentId = incId
            };
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username.ToLower());

            workRequest.CreatedBy = temp.Id;

            workRequest.DateTimeCreated = DateTime.Now;
            unitOfWork.WorkRequestRepository.AddWorkRequest(workRequest);

            if (await unitOfWork.SaveAsync())
            {
                await unitOfWork.NotificationRepository.NewNotification(new Notification()
                {
                    Type = "Success",
                    Content = "You created new work request: " + workRequest.Id,
                    DateTimeCreated = DateTime.Now,
                }, temp.Id);
                return Ok(_mapper.Map<WorkRequestDto>(workRequest));
            }

            return BadRequest("Failed to add work request");
        }

        [HttpDelete("{id}/{username}")]
        public async Task<IActionResult> DeleteWorkRequest(int id, string username)
        {
            var historyWork = await unitOfWork.HistoryWorkRequest.GetHistoryWorkRequestByWorkRequestIdAsync(id);
            var workRequest = await unitOfWork.WorkRequestRepository.GetWorkRequestByIdAsync(id);
            foreach (var item in historyWork)
            {
                unitOfWork.HistoryWorkRequest.DeleteHistoryWorkRequest(item);
            }
            unitOfWork.WorkRequestRepository.DeleteWorkRequest(workRequest);
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username.ToLower());

            if (await unitOfWork.SaveAsync())
            {
                await unitOfWork.NotificationRepository.NewNotification(new Notification()
                {
                    Type = "Warning",
                    Content = "You deleted work request: " + workRequest.Id,
                    DateTimeCreated = DateTime.Now,
                }, temp.Id);
                return Ok();
            }
            return BadRequest("Problem with deleting work request");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkRequestDto>> GetWorkRequestById(int id)
        {
            var workRequest = await unitOfWork.WorkRequestRepository.GetWorkRequestByIdAsync(id);
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.Id == workRequest.CreatedBy);


            WorkRequestDto finalWorkRequest = _mapper.Map<WorkRequestDto>(workRequest);
            finalWorkRequest.CreatedBy = temp.UserName;
            return Ok(finalWorkRequest);
        }

        [HttpPut("{username}")]
        public async Task<IActionResult> UpdateWorkRequest(WorkRequestDto workRequestDto, string username)
        {
            var workRequest = await unitOfWork.WorkRequestRepository.GetWorkRequestByIdAsync(workRequestDto.Id);

            int? incId = null;

            if (workRequestDto.IncidentId != 0)
            {
                incId = workRequestDto.IncidentId;
            }

            workRequest.Type = workRequestDto.Type;
            workRequest.Status = workRequestDto.Status;
            workRequest.Address = workRequestDto.Address;
            workRequest.Longitude = workRequestDto.Longitude;
            workRequest.Latitude = workRequestDto.Latitude;
            workRequest.StartDateTime = workRequestDto.StartDateTime;
            workRequest.EndDateTime = workRequestDto.EndDateTime;
            workRequest.Purpose = workRequestDto.Purpose;
            workRequest.Notes = workRequestDto.Notes;
            workRequest.EmergencyWork = workRequestDto.EmergencyWork;
            workRequest.Company = workRequestDto.Company;
            workRequest.PhoneNumber = workRequestDto.PhoneNumber;
            workRequest.IncidentId = workRequestDto.IncidentId;

            unitOfWork.WorkRequestRepository.Update(workRequest);

            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username.ToLower());

            if (await unitOfWork.SaveAsync())
            {
                await unitOfWork.NotificationRepository.NewNotification(new Notification()
                {
                    Type = "Success",
                    Content = "You updated work request: " + workRequest.Id,
                    DateTimeCreated = DateTime.Now,
                }, temp.Id);
                return NoContent();
            }


            return BadRequest("Failed to update work request");
        }

    }
}
