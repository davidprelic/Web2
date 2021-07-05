using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Repo
{
    public class CallRepository : ICallRepository
    {
        private readonly DataContext _context;
        public CallRepository(DataContext context)
        {
            _context = context;

        }

        public void AddCall(Call call)
        {
            _context.Calls.Add(call);
        }

        public void DeleteCall(Call call)
        {
            _context.Calls.Remove(call);
        }

        public async Task<Call> GetCallByIdAsync(int id)
        {
            return await _context.Calls.FindAsync(id);
        }

        public async Task<IEnumerable<Call>> GetCallsByIncidentIdAsync(int id)
        {
            return await _context.Calls
                .Where(x => x.IncidentId == id)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Call call)
        {
            _context.Entry(call).State = EntityState.Modified;
        }
    }
}