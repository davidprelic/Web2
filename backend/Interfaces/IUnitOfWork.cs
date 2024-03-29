﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IUnitOfWork
    {
        IConsumerRepository ConsumerRepository { get; }

        ICrewRepository CrewRepository { get; }

        IWorkPlanRepository WorkPlanRepository { get; }

        IIncidentRepository IncidentRepository { get; }
        ISafetyDocRepository SafetyDocRepository { get; }

        IHistorySafetyDocRepository HistorySafetyDocRepository { get; }
        IChecklistRepository ChecklistRepository { get; }


        IWorkRequestRepository WorkRequestRepository { get; }

        ICallRepository CallRepository { get; }
        IResolutionRepository ResolutionRepository { get; }
        IDeviceRepository DeviceRepository { get; }

        IWorkInstructionRepository WorkInstructionRepository { get; }

        IHistoryOfWorkPlanStateChangeRepository HistoryOfWorkPlanStateChangeRepository { get; }

        INotificationRepository NotificationRepository { get; }
        INotificationUserRepository NotificationUserRepository { get; }

        IHistoryOfWorkRequestRepository HistoryWorkRequest { get; }


        Task<bool> SaveAsync();
    }
}
