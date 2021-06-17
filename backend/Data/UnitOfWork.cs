using backend.Data.Repo;
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

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}
