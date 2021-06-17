using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Data.Repo
{
    public class WorkPlanRepository : IWorkPlanRepository
    {
        private readonly DataContext dc;

        public WorkPlanRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public void AddWorkPlan(WorkPlan workPlan)
        {
            dc.WorkPlans.AddAsync(workPlan);
        }

        public void DeleteWorkPlan(int workPlanId)
        {
            var workPlan = dc.WorkPlans.Find(workPlanId);

            dc.WorkPlans.Remove(workPlan);
        }

        public async Task<IEnumerable<WorkPlan>> GetWorkPlanAsync()
        {
            return await dc.WorkPlans.ToListAsync();
        }
    }
}
