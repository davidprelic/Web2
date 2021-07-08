using backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface ICrewRepository
    {
        void AddCrew(Crew crew);

        void DeleteCrew(Crew crew);
        
        void UpdateCrew(Crew crew);
        
        Task<bool> SaveAllAsync();
        
        Task<IEnumerable<Crew>> GetCrewsAsync();
        
        Task<Crew> GetCrewByIdAsync(int id);
    }
}
