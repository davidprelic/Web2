using System.Threading.Tasks;
using backend.Entities;

namespace backend.Interfaces
{
    public interface IChecklistRepository
    {
        void AddChecklist(Checklist checklist);
        void DeleteChecklist(Checklist checklist);
        void Update(Checklist checklist);
        Task<bool> SaveAllAsync();
        Task<Checklist> GetChecklistByIdAsync(int? id);
    }
}