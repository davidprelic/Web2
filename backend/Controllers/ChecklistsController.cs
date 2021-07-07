using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs;
using backend.Entities;
using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class ChecklistsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ChecklistsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<ChecklistDto>> CreateChecklist(ChecklistDto checklistDto)
        {
            var checklist = _mapper.Map<Checklist>(checklistDto);
            _unitOfWork.ChecklistRepository.AddChecklist(checklist);

             if (await _unitOfWork.ChecklistRepository.SaveAllAsync()) return Ok(_mapper.Map<ChecklistDto>(checklist));

            return BadRequest("Failed to add checklist");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ChecklistDto>> GetChecklist(int id)
        {
            var checklist = await _unitOfWork.ChecklistRepository.GetChecklistByIdAsync(id);

            return Ok(_mapper.Map<ChecklistDto>(checklist));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateChecklist(ChecklistDto checklistDto)
        {
            var checklist = await _unitOfWork.ChecklistRepository.GetChecklistByIdAsync(checklistDto.Id);

            _mapper.Map(checklistDto, checklist);

            _unitOfWork.ChecklistRepository.Update(checklist);

            if (await _unitOfWork.ChecklistRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update checklist");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteChecklist(int id)
        {
            var checklist = await _unitOfWork.ChecklistRepository.GetChecklistByIdAsync(id);

            _unitOfWork.ChecklistRepository.DeleteChecklist(checklist);

            if (await _unitOfWork.ChecklistRepository.SaveAllAsync()) return Ok();

            return BadRequest("Problem with deleting checklist");
        }
    }
}