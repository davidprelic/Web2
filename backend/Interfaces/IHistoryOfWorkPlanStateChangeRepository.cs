using backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IHistoryOfWorkPlanStateChangeRepository
    {
        void AddHistoryOfWorkPlanStateChange(HistoryOfWorkPlanStateChange historyOfWorkPlanStateChange);
        void DeleteHistoryOfWorkPlanStateCHange(HistoryOfWorkPlanStateChange historyOfWorkPlanStateChange);
        void Update(HistoryOfWorkPlanStateChange historyOfWorkPlanStateChange);
        Task<HistoryOfWorkPlanStateChange> GetHistoryOfWorkPlanStateChange(int id);

        Task<IEnumerable<HistoryOfWorkPlanStateChange>> GetHistoryOfWorkPlanStateChangeByWorkPlanId(int id);
    }
}
