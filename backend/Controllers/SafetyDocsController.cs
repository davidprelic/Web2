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
    public class SafetyDocsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        public SafetyDocsController(IUnitOfWork unitOfWork, IMapper mapper, UserManager<User> userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<ActionResult<SafetyDocDto>> CreateSafetyDoc(SafetyDocDto safetyDocDto)
        {
            int? crewId = null;
            int? workPlanId = null;

            if (safetyDocDto.CrewId != 0)
            {
                crewId = safetyDocDto.CrewId;
            }

            if (safetyDocDto.WorkPlanId != 0)
            {
                workPlanId = safetyDocDto.WorkPlanId;
            }

            var safetyDoc = new SafetyDocument
            {
                Type = safetyDocDto.Type,
                Status = safetyDocDto.Status,
                Details = safetyDocDto.Details,
                Notes = safetyDocDto.Notes,
                PhoneNumber = safetyDocDto.PhoneNumber,
                DateTimeCreated = DateTime.Now,
                WorkPlanId = workPlanId,
                CrewId = crewId
            };

            Checklist checklist = new Checklist();
            _unitOfWork.ChecklistRepository.AddChecklist(checklist);
            await _unitOfWork.ChecklistRepository.SaveAllAsync();

            safetyDoc.ChecklistId = checklist.Id;

            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == safetyDocDto.CreatedBy.ToLower());
            safetyDoc.CreatedBy = temp.Id;

            _unitOfWork.SafetyDocRepository.AddSafetyDoc(safetyDoc);
            if (await _unitOfWork.SafetyDocRepository.SaveAllAsync())
            {
                await _unitOfWork.NotificationRepository.NewNotification(new Notification()
                {
                    Id = 0,
                    Type = "Success",
                    Content = "You have created new safety doc: " + safetyDoc.Id,
                    DateTimeCreated = DateTime.Now,
                }, temp.Id);
                return Ok(_mapper.Map<SafetyDocDto>(safetyDoc));
            }

            return BadRequest("Failed to add safetyDoc");

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SafetyDocument>>> GetSafetyDocs()
        {
            var safetyDocs = await _unitOfWork.SafetyDocRepository.GetSafetyDocsAsync();

            var finalSafetyDocs = _mapper.Map<List<SafetyDocDto>>(safetyDocs);

            return Ok(finalSafetyDocs);
        }

        [HttpGet("mine/{username}")]
        public async Task<ActionResult<IEnumerable<SafetyDocument>>> GetSafetyDocsByUsername(string username)
        {
            User temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username);

            var safetyDocs = await _unitOfWork.SafetyDocRepository.GetSafetyDocsByUserIdAsync(temp.Id);

            var finalSafetyDocs = _mapper.Map<List<SafetyDocDto>>(safetyDocs);

            return Ok(finalSafetyDocs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SafetyDocDto>> GetSafetyDoc(int id)
        {
            var safetyDoc = await _unitOfWork.SafetyDocRepository.GetSafetyDocByIdAsync(id);

            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.Id == safetyDoc.CreatedBy);

            SafetyDocDto finalSafetyDoc = _mapper.Map<SafetyDocDto>(safetyDoc);
            finalSafetyDoc.CreatedBy = temp.UserName;

            return Ok(_mapper.Map<SafetyDocDto>(finalSafetyDoc));
        }

        [HttpDelete("{id}/{username}")]
        public async Task<ActionResult> DeleteSafetyDoc(int id, string username)
        {
            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username.ToLower());
            var safetyDoc = await _unitOfWork.SafetyDocRepository.GetSafetyDocByIdAsync(id);

            var checklist = await _unitOfWork.ChecklistRepository.GetChecklistByIdAsync(safetyDoc.ChecklistId);

            _unitOfWork.SafetyDocRepository.DeleteSafetyDoc(safetyDoc);

            _unitOfWork.ChecklistRepository.DeleteChecklist(checklist);

            var historySafetyDocs = await _unitOfWork.HistorySafetyDocRepository.GetHistorySafetyDocsBySafetyDocIdAsync(id);

            foreach (var hist in historySafetyDocs)
            {
                _unitOfWork.HistorySafetyDocRepository.DeleteHistorySafetyDoc(hist);
            }

            if (await _unitOfWork.SaveAsync())
            {
                await _unitOfWork.NotificationRepository.NewNotification(new Notification()
                {
                    Id = 0,
                    Type = "Warning",
                    Content = "You have deleted safety doc: " + safetyDoc.Id,
                    DateTimeCreated = DateTime.Now,
                }, temp.Id);
                return Ok();
            }

            return BadRequest("Problem with deleting safetyDoc");
        }

        [HttpPut("{username}")]
        public async Task<ActionResult> UpdateSafetyDoc(SafetyDocDto safetyDocDto, string username)
        {
            var safetyDoc = await _unitOfWork.SafetyDocRepository.GetSafetyDocByIdAsync(safetyDocDto.Id);

            var temp = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username.ToLower());

            int? crewId = null;
            int? workPlanId = null;

            if (safetyDocDto.CrewId != 0)
            {
                crewId = safetyDocDto.CrewId;
            }

            if (safetyDocDto.WorkPlanId != 0)
            {
                workPlanId = safetyDocDto.WorkPlanId;
            }

            safetyDoc.Type = safetyDocDto.Type;
            safetyDoc.Status = safetyDocDto.Status;
            safetyDoc.Details = safetyDocDto.Details;
            safetyDoc.Notes = safetyDocDto.Notes;
            safetyDoc.PhoneNumber = safetyDocDto.PhoneNumber;
            safetyDoc.WorkPlanId = safetyDocDto.WorkPlanId;
            safetyDoc.CrewId = safetyDocDto.CrewId;
            
            // _mapper.Map(safetyDocDto, safetyDoc);

            _unitOfWork.SafetyDocRepository.Update(safetyDoc);

            if (await _unitOfWork.SafetyDocRepository.SaveAllAsync())
            {
                await _unitOfWork.NotificationRepository.NewNotification(new Notification()
                {
                    Id = 0,
                    Type = "Success",
                    Content = "You have updated safety doc: " + safetyDoc.Id,
                    DateTimeCreated = DateTime.Now,
                }, temp.Id);

                return NoContent();
            }

            return BadRequest("Failed to update safetyDoc");
        }



    }
}