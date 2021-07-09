using backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IWorkInstructionRepository
    {
        void AddWorkInstruction(WorkInstruction workInstruction);

        void DeleteWorkInstruction(WorkInstruction workInstruction);

        void Update(WorkInstruction workInstruction);

        Task<WorkInstruction> GetWorkInstructionByIdAsync(int id);

        Task<IEnumerable<WorkInstruction>> GetWorkInstructionsByWorkPlanIdAsync(int id);
    }
}
