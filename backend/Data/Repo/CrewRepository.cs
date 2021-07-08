using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Data.Repo
{
    public class CrewRepository : ICrewRepository
    {
        private readonly DataContext context;

        public CrewRepository(DataContext context)
        {
            this.context = context;
        }

        public void AddCrew(Crew crew)
        {
            context.Crews.AddAsync(crew);
        }

        public void DeleteCrew(Crew crew)
        {
            context.Crews.Remove(crew);
        }

        public async Task<Crew> GetCrewByIdAsync(int id)
        {
            return await context.Crews.FindAsync(id);
        }

        public async Task<IEnumerable<Crew>> GetCrewsAsync()
        {
            return await context.Crews.ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void UpdateCrew(Crew crew)
        {
            context.Entry(crew).State = EntityState.Modified;
        }
    }
}
