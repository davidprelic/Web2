using System.Threading.Tasks;
using backend.Entities;

namespace backend.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(User user);
    }
}