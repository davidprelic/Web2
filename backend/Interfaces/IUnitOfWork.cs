using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IUnitOfWork
    {
        IConsumerRepository ConsumerRepository { get; }

        IWorkPlanRepository WorkPlanRepository { get; }
        Task<bool> SaveAsync();
    }
}
