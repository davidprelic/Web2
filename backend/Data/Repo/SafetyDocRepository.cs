using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Repo
{
    public class SafetyDocRepository : ISafetyDocRepository
    {
        private readonly DataContext _context;
        public SafetyDocRepository(DataContext context)
        {
            _context = context;
        }

        public void AddSafetyDoc(SafetyDocument safetyDoc)
        {
            _context.SafetyDocuments.Add(safetyDoc);
        }

        public void DeleteSafetyDoc(SafetyDocument safetyDoc)
        {
            _context.SafetyDocuments.Remove(safetyDoc);
        }

        public async Task<SafetyDocument> GetSafetyDocByIdAsync(int id)
        {
            return await _context.SafetyDocuments.FindAsync(id);
        }

        public async Task<IEnumerable<SafetyDocument>> GetSafetyDocsAsync()
        {
            return await _context.SafetyDocuments.ToListAsync();
        }

        public async Task<IEnumerable<SafetyDocument>> GetSafetyDocsByUserIdAsync(int id)
        {
            return await _context.SafetyDocuments
                .Where(x => x.CreatedBy == id)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(SafetyDocument safetyDoc)
        {
            _context.Entry(safetyDoc).State = EntityState.Modified;
        }
    }
}