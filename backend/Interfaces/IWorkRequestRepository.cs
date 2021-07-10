using backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IWorkRequestRepository
    {
        Task<IEnumerable<WorkRequest>> GetWorkRequestsAsync();

        void AddWorkRequest(WorkRequest workRequest);

        void DeleteWorkRequest(WorkRequest workRequest);

        Task<WorkRequest> GetWorkRequestByIdAsync(int id);

        Task<bool> SaveAllAsync();

        void Update(WorkRequest workRequest);
    }
}
