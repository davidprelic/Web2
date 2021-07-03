using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Entities;

namespace backend.Interfaces
{
    public interface IIncidentRepository
    {
        void AddIncident(Incident incident);
        void DeleteIncident(Incident incident);
        void Update(Incident incident);
        Task<bool> SaveAllAsync();
        Task<Incident> GetIncidentByIdAsync(int id);
        Task<IEnumerable<Incident>> GetActiveIncidentsAsync();
        Task<IEnumerable<Incident>> GetIncidentsByUserIdAsync(int id);
        Task<IEnumerable<Incident>> GetIncidentsAsync();

    }
}