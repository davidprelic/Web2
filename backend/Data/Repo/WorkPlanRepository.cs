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

        public void DeleteWorkPlan(WorkPlan workPlan)
        {
            dc.WorkPlans.Remove(workPlan);
        }

        public async Task<IEnumerable<WorkPlan>> GetWorkPlanAsync()
        {
            return await dc.WorkPlans.ToListAsync();
        }

        public async Task<WorkPlan> GetWorkPlanByIdAsync(int id)
        {
            return await dc.WorkPlans.FindAsync(id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }

        public void Update(WorkPlan workPlan)
        {
            dc.Entry(workPlan).State = EntityState.Modified;
        }
    }
}
