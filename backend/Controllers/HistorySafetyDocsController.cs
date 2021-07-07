using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs;
using backend.Entities;
using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class HistorySafetyDocsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public HistorySafetyDocsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<HistorySafetyDocDto>> CreateHistorySafetyDoc(HistorySafetyDocDto historySafetyDocDto)
        {
            var historySafetyDoc = _mapper.Map<HistoryOfSafetyDocumentStateChange>(historySafetyDocDto);
            _unitOfWork.HistorySafetyDocRepository.AddHistorySafetyDoc(historySafetyDoc);

             if (await _unitOfWork.HistorySafetyDocRepository.SaveAllAsync()) return Ok(_mapper.Map<HistorySafetyDocDto>(historySafetyDoc));

            return BadRequest("Failed to add historySafetyDoc");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HistorySafetyDocDto>> GetHistorySafetyDoc(int id)
        {
            var historySafetyDoc = await _unitOfWork.HistorySafetyDocRepository.GetHistorySafetyDocByIdAsync(id);

            return Ok(_mapper.Map<HistorySafetyDocDto>(historySafetyDoc));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateHistorySafetyDoc(HistorySafetyDocDto historySafetyDocDto)
        {
            var historySafetyDoc = await _unitOfWork.HistorySafetyDocRepository.GetHistorySafetyDocByIdAsync(historySafetyDocDto.Id);

            _mapper.Map(historySafetyDocDto, historySafetyDoc);

            _unitOfWork.HistorySafetyDocRepository.Update(historySafetyDoc);

            if (await _unitOfWork.HistorySafetyDocRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update historySafetyDoc");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteHistorySafetyDoc(int id)
        {
            var historySafetyDoc = await _unitOfWork.HistorySafetyDocRepository.GetHistorySafetyDocByIdAsync(id);

            _unitOfWork.HistorySafetyDocRepository.DeleteHistorySafetyDoc(historySafetyDoc);

            if (await _unitOfWork.HistorySafetyDocRepository.SaveAllAsync()) return Ok();

            return BadRequest("Problem with deleting historySafetyDoc");
        }
    }
}