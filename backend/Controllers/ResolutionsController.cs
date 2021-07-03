using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs;
using backend.Entities;
using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class ResolutionsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ResolutionsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<ResolutionDto>> CreateResolution(ResolutionDto resolutionDto)
        {
            var resol = _mapper.Map<Resolution>(resolutionDto);
            _unitOfWork.ResolutionRepository.AddResolution(resol);

             if (await _unitOfWork.ResolutionRepository.SaveAllAsync()) return Ok(_mapper.Map<ResolutionDto>(resol));

            return BadRequest("Failed to add resolution");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResolutionDto>> GetResolution(int id)
        {
            var resol = await _unitOfWork.ResolutionRepository.GetResolutionByIdAsync(id);

            return Ok(_mapper.Map<ResolutionDto>(resol));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateResolution(ResolutionDto resolutionDto)
        {
            var resol = await _unitOfWork.ResolutionRepository.GetResolutionByIdAsync(resolutionDto.Id);

            _mapper.Map(resolutionDto, resol);

            _unitOfWork.ResolutionRepository.Update(resol);

            if (await _unitOfWork.ResolutionRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update resolution");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteResolution(int id)
        {
            var resol = await _unitOfWork.ResolutionRepository.GetResolutionByIdAsync(id);

            _unitOfWork.ResolutionRepository.DeleteResolution(resol);

            if (await _unitOfWork.ResolutionRepository.SaveAllAsync()) return Ok();

            return BadRequest("Problem with deleting resolution");
        }

    }
}