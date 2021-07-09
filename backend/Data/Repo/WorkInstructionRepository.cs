using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Data.Repo
{
    public class WorkInstructionRepository : IWorkInstructionRepository
    {
        private readonly DataContext dc;

        public WorkInstructionRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void AddWorkInstruction(WorkInstruction workInstruction)
        {
            dc.WorkInstructions.Add(workInstruction);
        }

        public void DeleteWorkInstruction(WorkInstruction workInstruction)
        {
            dc.WorkInstructions.Remove(workInstruction);
        }

        public async Task<WorkInstruction> GetWorkInstructionByIdAsync(int id)
        {
            return await dc.WorkInstructions.FindAsync(id);
        }

        public async Task<IEnumerable<WorkInstruction>> GetWorkInstructionsByWorkPlanIdAsync(int id)
        {
            return await dc.WorkInstructions.Where(x => x.WorkPlanId == id).ToListAsync();
        }

        public void Update(WorkInstruction workInstruction)
        {
            dc.Entry(workInstruction).State = EntityState.Modified;
        }
    }
}
