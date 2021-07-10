using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Data.Repo
{
    public class HistoryOfWorkRequestRepository : IHistoryOfWorkRequestRepository
    {
        private readonly DataContext _context;

        public HistoryOfWorkRequestRepository(DataContext context)
        {
            _context = context;
        }

        public void AddHistoryWorkRequest(HistoryOfWorkRequestStateChange historyOfWorkRequest)
        {
            _context.HistoryOfWorkRequestStateChanges.Add(historyOfWorkRequest);
        }

        public void DeleteHistoryWorkRequest(HistoryOfWorkRequestStateChange historyOfWorkRequest)
        {
            _context.HistoryOfWorkRequestStateChanges.Remove(historyOfWorkRequest);
        }

        public async Task<HistoryOfWorkRequestStateChange> GetHistoryWorkRequestByIdAsync(int id)
        {
            return await _context.HistoryOfWorkRequestStateChanges.FindAsync(id);
        }

        public async Task<IEnumerable<HistoryOfWorkRequestStateChange>> GetHistoryWorkRequestByWorkRequestIdAsync(int id)
        {
            return await _context.HistoryOfWorkRequestStateChanges
                .Where(x => x.WorkRequestId == id)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(HistoryOfWorkRequestStateChange historyOfWorkRequest)
        {
            _context.Entry(historyOfWorkRequest).State = EntityState.Modified;
        }
    }
}
