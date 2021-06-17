using backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IWorkPlanRepository
    {
        Task<IEnumerable<WorkPlan>> GetWorkPlanAsync();

        void AddWorkPlan(WorkPlan workPlan);

        void DeleteWorkPlan(int workPlanId);
    }
}
