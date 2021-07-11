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
    public class HistoryWorkPlanController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public HistoryWorkPlanController(UserManager<User> usermanager, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _userManager = usermanager;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<HistoryWorkPlanDto>> CreateHistoryWorkPlan(HistoryWorkPlanDto historyWorkPlanDto)
        {
            var historyWorkPlan = _mapper.Map<HistoryOfWorkPlanStateChange>(historyWorkPlanDto);
            _unitOfWork.HistoryOfWorkPlanStateChangeRepository.AddHistoryOfWorkPlanStateChange(historyWorkPlan);
           

            if (await _unitOfWork.SaveAsync())
            {
                await _unitOfWork.NotificationRepository.NewNotification(new Notification()
                {
                    Type = "Success",
                    Content = "You changed state for work plan: " + historyWorkPlan.WorkPlanId,
                    DateTimeCreated = DateTime.Now,
                }, historyWorkPlan.UserId);
                return Ok(_mapper.Map<HistoryWorkPlanDto>(historyWorkPlan));
            }
            return BadRequest("Failed to add history of work plan");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HistoryWorkPlanDto>> GetHistoryWorkPlan(int id)
        {
            var historyWorkPlan = await _unitOfWork.HistoryOfWorkPlanStateChangeRepository.GetHistoryOfWorkPlanStateChange(id);

            return Ok(_mapper.Map<HistoryWorkPlanDto>(historyWorkPlan));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateHistoryWorkPlan(HistoryWorkPlanDto historyWorkPlanDto)
        {
            var historyWorkPlan = await _unitOfWork.HistoryOfWorkPlanStateChangeRepository.GetHistoryOfWorkPlanStateChange(historyWorkPlanDto.Id);

            _mapper.Map(historyWorkPlanDto, historyWorkPlan);

            _unitOfWork.HistoryOfWorkPlanStateChangeRepository.Update(historyWorkPlan);

            if (await _unitOfWork.SaveAsync())
            {
                await _unitOfWork.NotificationRepository.NewNotification(new Notification()
                {
                    Type = "Success",
                    Content = "You changed state for work plan: " + historyWorkPlan.WorkPlanId,
                    DateTimeCreated = DateTime.Now,
                }, historyWorkPlan.Id);

                return NoContent();
            }

            return BadRequest("Failed to update history work plan");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteHistoryWorkPlan(int id)
        {
            var historyWorkPlan = await _unitOfWork.HistoryOfWorkPlanStateChangeRepository.GetHistoryOfWorkPlanStateChange(id);

            _unitOfWork.HistoryOfWorkPlanStateChangeRepository.DeleteHistoryOfWorkPlanStateCHange(historyWorkPlan);

            if (await _unitOfWork.SaveAsync()) return Ok();

            return BadRequest("Problem with deleting history work plan");
        }

        [HttpGet("workplan/{id}")]
        public async Task<ActionResult<IEnumerable<HistoryWorkPlanDto>>> GetHistoryWorkPlanByWorkPlanId(int id)
        {
            var historyWorkPlan = await _unitOfWork.HistoryOfWorkPlanStateChangeRepository.GetHistoryOfWorkPlanStateChangeByWorkPlanId(id);

            var finalHistoryWorkPlan = _mapper.Map<List<HistoryWorkPlanDto>>(historyWorkPlan);

            return Ok(finalHistoryWorkPlan);
        }
    }
}
