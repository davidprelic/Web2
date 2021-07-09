using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Data.Repo
{
    public class HistoryOfWorkPlanStateChangeRepository : IHistoryOfWorkPlanStateChangeRepository
    {
        private readonly DataContext db;

        public HistoryOfWorkPlanStateChangeRepository(DataContext context)
        {
            db = context;
        }

        public void AddHistoryOfWorkPlanStateChange(HistoryOfWorkPlanStateChange historyOfWorkPlanStateChange)
        {
            db.HistoryOfWorkPlanStateChanges.Add(historyOfWorkPlanStateChange);
        }

        public void DeleteHistoryOfWorkPlanStateCHange(HistoryOfWorkPlanStateChange historyOfWorkPlanStateChange)
        {
            db.HistoryOfWorkPlanStateChanges.Remove(historyOfWorkPlanStateChange);
        }

        public async Task<HistoryOfWorkPlanStateChange> GetHistoryOfWorkPlanStateChange(int id)
        {
            return await db.HistoryOfWorkPlanStateChanges.FindAsync(id);
        }

        public async Task<IEnumerable<HistoryOfWorkPlanStateChange>> GetHistoryOfWorkPlanStateChangeByWorkPlanId(int id)
        {
            return await db.HistoryOfWorkPlanStateChanges.Where(x => x.WorkPlanId == id).ToListAsync();
        }

        public void Update(HistoryOfWorkPlanStateChange historyOfWorkPlanStateChange)
        {
            db.Entry(historyOfWorkPlanStateChange).State = EntityState.Modified;
        }
    }
}
