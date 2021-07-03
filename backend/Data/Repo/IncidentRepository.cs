using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Repo
{
    public class IncidentRepository : IIncidentRepository
    {
        private readonly DataContext _context;
        public IncidentRepository(DataContext context)
        {
            _context = context;
        }

        public void AddIncident(Incident incident)
        {
            _context.Incidents.Add(incident);
        }
        
        public void DeleteIncident(Incident incident)
        {
            _context.Incidents.Remove(incident);
        }

        public async Task<Incident> GetIncidentByIdAsync(int id)
        {
            return await _context.Incidents.FindAsync(id);
        }

        public async Task<IEnumerable<Incident>> GetIncidentsAsync()
        {
            return await _context.Incidents.ToListAsync();
        }

        public async Task<IEnumerable<Incident>> GetActiveIncidentsAsync()
        {
            return await _context.Incidents
                .Where(x => x.Status == "Active")
                .ToListAsync();
        }

        public async Task<IEnumerable<Incident>> GetIncidentsByUserIdAsync(int id)
        {
            return await _context.Incidents
                .Where(x => x.TakenToResolveUserId == id)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Incident incident)
        {
             _context.Entry(incident).State = EntityState.Modified;
        }
    }
}