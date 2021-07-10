using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Data.Repo
{
    public class WorkRequestRepository : IWorkRequestRepository
    {
        private readonly DataContext context;

        public WorkRequestRepository(DataContext dataContext)
        {
            this.context = dataContext;
        }

        public void AddWorkRequest(WorkRequest workRequest)
        {
            context.WorkRequests.AddAsync(workRequest);
        }

        public void DeleteWorkRequest(WorkRequest workRequest)
        {
            context.WorkRequests.Remove(workRequest);
        }

        public async Task<WorkRequest> GetWorkRequestByIdAsync(int id)
        {
            return await context.WorkRequests.FindAsync(id);
        }

        public async Task<IEnumerable<WorkRequest>> GetWorkRequestsAsync()
        {
            return await context.WorkRequests.ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(WorkRequest workRequest)
        {
            context.Entry(workRequest).State = EntityState.Modified;
        }
    }
}
