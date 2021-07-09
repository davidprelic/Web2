﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IUnitOfWork
    {
        IConsumerRepository ConsumerRepository { get; }

        IWorkPlanRepository WorkPlanRepository { get; }

        IIncidentRepository IncidentRepository { get; }

        ICallRepository CallRepository { get; }
        IResolutionRepository ResolutionRepository { get; }
        IDeviceRepository DeviceRepository { get; }

        IWorkInstructionRepository WorkInstructionRepository { get; }

        IHistoryOfWorkPlanStateChangeRepository HistoryOfWorkPlanStateChangeRepository { get; }

        Task<bool> SaveAsync();
    }
}
