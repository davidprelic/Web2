using backend.Entities;
using backend.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    public class WorkPlanController : BaseApiController
    {
        private readonly IUnitOfWork uow;

        public WorkPlanController(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var workplans = await uow.WorkPlanRepository.GetWorkPlanAsync();
            return Ok(workplans);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddWorkPlan(WorkPlan workPlan)
        {
            uow.WorkPlanRepository.AddWorkPlan(workPlan);
            await uow.SaveAsync();
            return Ok(workPlan);
        }

        [HttpDelete("deleteWorkPlan")]
        public async Task<IActionResult> DeleteWorkPlan(int id)
        {
            uow.WorkPlanRepository.DeleteWorkPlan(id);
            await uow.SaveAsync();
            return Ok(id);
        }
    }
}
