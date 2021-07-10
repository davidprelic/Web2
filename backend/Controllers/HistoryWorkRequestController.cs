using AutoMapper;
using backend.DTOs;
using backend.Entities;
using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    public class HistoryWorkRequestController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public HistoryWorkRequestController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<HistoryWorkRequestDto>> CreateHistoryWorkRequest(HistoryWorkRequestDto historyWorkRequestDto)
        {
            var historyWorkRequest = _mapper.Map<HistoryOfWorkRequestStateChange>(historyWorkRequestDto);
            _unitOfWork.HistoryWorkRequest.AddHistoryWorkRequest(historyWorkRequest);

            if (await _unitOfWork.HistoryWorkRequest.SaveAllAsync()) return Ok(_mapper.Map<HistoryWorkRequestDto>(historyWorkRequest));

            return BadRequest("Failed to add historyWorkRequest");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HistoryWorkRequestDto>> GetHistoryWorkRequest(int id)
        {
            var historyOfWorkRequest = await _unitOfWork.HistoryWorkRequest.GetHistoryWorkRequestByIdAsync(id);

            return Ok(_mapper.Map<HistoryWorkRequestDto>(historyOfWorkRequest));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateHistoryWorkRequest(HistoryWorkRequestDto historyWorkRequestDto)
        {
            var historyOfWorkRequest = await _unitOfWork.HistoryWorkRequest.GetHistoryWorkRequestByIdAsync(historyWorkRequestDto.Id);

            _mapper.Map(historyWorkRequestDto, historyOfWorkRequest);

            _unitOfWork.HistoryWorkRequest.Update(historyOfWorkRequest);

            if (await _unitOfWork.HistoryWorkRequest.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update history of work request");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteHistoryWorkRequest(int id)
        {
            var historyOfWorkRequest = await _unitOfWork.HistoryWorkRequest.GetHistoryWorkRequestByIdAsync(id);

            _unitOfWork.HistoryWorkRequest.DeleteHistoryWorkRequest(historyOfWorkRequest);

            if (await _unitOfWork.HistoryWorkRequest.SaveAllAsync()) return Ok();

            return BadRequest("Problem with deleting history of work request");
        }

        [HttpGet("work-request/{id}")]
        public async Task<ActionResult<IEnumerable<HistoryWorkRequestDto>>> GetHistoryWorkRequestByWorkRequestId(int id)
        {
            var historyOfWorkRequests = await _unitOfWork.HistoryWorkRequest.GetHistoryWorkRequestByWorkRequestIdAsync(id);

            var finalhistoryOfWorkRequest = _mapper.Map<List<HistoryWorkRequestDto>>(historyOfWorkRequests);

            return Ok(finalhistoryOfWorkRequest);
        }
    }
}
