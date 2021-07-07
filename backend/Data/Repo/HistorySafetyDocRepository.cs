using System.Threading.Tasks;
using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Repo
{
    public class HistorySafetyDocRepository : IHistorySafetyDocRepository
    {
        private readonly DataContext _context;
        public HistorySafetyDocRepository(DataContext context)
        {
            _context = context;
        }

        public void AddHistorySafetyDoc(HistoryOfSafetyDocumentStateChange historySafetyDoc)
        {
            _context.HistoryOfSafetyDocumentStateChanges.Add(historySafetyDoc);
        }

        public void DeleteHistorySafetyDoc(HistoryOfSafetyDocumentStateChange historySafetyDoc)
        {
            _context.HistoryOfSafetyDocumentStateChanges.Remove(historySafetyDoc);
        }

        public async Task<HistoryOfSafetyDocumentStateChange> GetHistorySafetyDocByIdAsync(int id)
        {
            return await _context.HistoryOfSafetyDocumentStateChanges.FindAsync(id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(HistoryOfSafetyDocumentStateChange historySafetyDoc)
        {
            _context.Entry(historySafetyDoc).State = EntityState.Modified;
        }
    }
}