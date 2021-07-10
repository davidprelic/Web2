﻿using backend.Data.Repo;
using backend.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext dc;

        public UnitOfWork(DataContext dc)
        {
            this.dc = dc;
        }

        public IConsumerRepository ConsumerRepository =>
            new ConsumerRepository(dc);

        public IWorkPlanRepository WorkPlanRepository =>
            new WorkPlanRepository(dc);

        public IIncidentRepository IncidentRepository => 
            new IncidentRepository(dc);

        public ICallRepository CallRepository => 
            new CallRepository(dc);

        public IResolutionRepository ResolutionRepository => 
            new ResolutionRepository(dc);

        public IDeviceRepository DeviceRepository => 
            new DeviceRepository(dc);

        public IWorkInstructionRepository WorkInstructionRepository =>
            new WorkInstructionRepository(dc);

        public IHistoryOfWorkPlanStateChangeRepository HistoryOfWorkPlanStateChangeRepository =>
            new HistoryOfWorkPlanStateChangeRepository(dc);

        public INotificationRepository NotificationRepository =>
            new NotificationRepository(dc);

        public INotificationUserRepository NotificationUserRepository =>
            new NotificationUserRepository(dc);

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}
