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
    public class SafetyDocsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public SafetyDocsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<SafetyDocDto>> CreateSafetyDoc(SafetyDocDto safetyDocDto)
        {
            var safetyDoc = _mapper.Map<SafetyDocument>(safetyDocDto);
            safetyDoc.DateTimeCreated = DateTime.Now;
            
            Checklist checklist = new Checklist();
            _unitOfWork.ChecklistRepository.AddChecklist(checklist);
            await _unitOfWork.ChecklistRepository.SaveAllAsync();

            safetyDoc.ChecklistId = checklist.Id;

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

            return Ok(_mapper.Map<SafetyDocDto>(safetyDoc));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateSafetyDoc(SafetyDocDto safetyDocDto)
        {
            var safetyDoc = await _unitOfWork.SafetyDocRepository.GetSafetyDocByIdAsync(safetyDocDto.Id);

            safetyDocDto.ChecklistId = safetyDoc.ChecklistId;
            
            _mapper.Map(safetyDocDto, safetyDoc);

            _unitOfWork.SafetyDocRepository.Update(safetyDoc);

            if (await _unitOfWork.SafetyDocRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update safetyDoc");
        }



    }
}