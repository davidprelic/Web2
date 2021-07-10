﻿using AutoMapper;
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

        [HttpPost]
        public async Task<ActionResult<WorkRequestDto>> CreateWorkRequest(WorkRequestDto workRequestDto)
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
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == workRequestDto.CreatedBy.ToLower());

            workRequest.CreatedBy = temp.Id;

            workRequest.DateTimeCreated = DateTime.Now;
            unitOfWork.WorkRequestRepository.AddWorkRequest(workRequest);

            if (await unitOfWork.SaveAsync()) return Ok(_mapper.Map<WorkRequestDto>(workRequest));

            return BadRequest("Failed to add work request");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkRequest(int id)
        {
            var workRequest = await unitOfWork.WorkRequestRepository.GetWorkRequestByIdAsync(id);
            unitOfWork.WorkRequestRepository.DeleteWorkRequest(workRequest);
            if (await unitOfWork.SaveAsync()) return Ok();
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

        [HttpPut]
        public async Task<IActionResult> UpdateWorkRequest(WorkRequestDto workRequestDto)
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

            if (await unitOfWork.SaveAsync()) return NoContent();

            return BadRequest("Failed to update work request");
        }

    }
}