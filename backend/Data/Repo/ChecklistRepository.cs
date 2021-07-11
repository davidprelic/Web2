using System.Threading.Tasks;
using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Repo
{
    public class ChecklistRepository : IChecklistRepository
    {
        private readonly DataContext _context;
        public ChecklistRepository(DataContext context)
        {
            _context = context;
        }

        public void AddChecklist(Checklist checklist)
        {
            _context.Checklists.Add(checklist);
        }

        public void DeleteChecklist(Checklist checklist)
        {
             _context.Checklists.Remove(checklist);
        }

        public async Task<Checklist> GetChecklistByIdAsync(int? id)
        {
            return await _context.Checklists.FindAsync(id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Checklist checklist)
        {
            _context.Entry(checklist).State = EntityState.Modified;
        }
    }
}