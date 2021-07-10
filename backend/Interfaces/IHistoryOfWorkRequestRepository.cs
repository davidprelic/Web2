using backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IHistoryOfWorkRequestRepository
    {
        void AddHistoryWorkRequest(HistoryOfWorkRequestStateChange historyOfWorkRequest);
        void DeleteHistoryWorkRequest(HistoryOfWorkRequestStateChange historyOfWorkRequest);
        void Update(HistoryOfWorkRequestStateChange historyOfWorkRequest);
        Task<bool> SaveAllAsync();
        Task<HistoryOfWorkRequestStateChange> GetHistoryWorkRequestByIdAsync(int id);
        Task<IEnumerable<HistoryOfWorkRequestStateChange>> GetHistoryWorkRequestByWorkRequestIdAsync(int id);
    }
}
