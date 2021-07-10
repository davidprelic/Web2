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
            
            if(safetyDocDto.CrewId != 0)
            {
                crewId = safetyDocDto.CrewId;
            }

            if(safetyDocDto.WorkPlanId != 0)
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
            if (await _unitOfWork.SafetyDocRepository.SaveAllAsync()) return Ok(_mapper.Map<SafetyDocDto>(safetyDoc));

            return BadRequest("Failed to add safetyDoc");

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SafetyDocument>>> GetSafetyDocs()
        {
            var safetyDocs = await _unitOfWork.SafetyDocRepository.GetSafetyDocsAsync();

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

        [HttpPut]
        public async Task<ActionResult> UpdateSafetyDoc(SafetyDocDto safetyDocDto)
        {
            var safetyDoc = await _unitOfWork.SafetyDocRepository.GetSafetyDocByIdAsync(safetyDocDto.Id);


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

            if (await _unitOfWork.SafetyDocRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update safetyDoc");
        }



    }
}