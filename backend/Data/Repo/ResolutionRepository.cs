using System.Threading.Tasks;
using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Repo
{
    public class ResolutionRepository : IResolutionRepository
    {
        private readonly DataContext _context;
        public ResolutionRepository(DataContext context)
        {
            _context = context;
        }

        public void AddResolution(Resolution resolution)
        {
            _context.Resolutions.Add(resolution);
        }

        public void DeleteResolution(Resolution resolution)
        {
            _context.Resolutions.Remove(resolution);
        }

        public async Task<Resolution> GetResolutionByIdAsync(int? id)
        {
            return await _context.Resolutions.FindAsync(id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Resolution resolution)
        {
            _context.Entry(resolution).State = EntityState.Modified;
        }
    }
}