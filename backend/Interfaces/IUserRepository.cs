using backend.DTOs;
using backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<CrewMemberDto>> GetUsersAsync(int id);

        Task<IEnumerable<CrewMemberDto>> GetUsersByCrewIdAsync(int id);

        Task<CrewMemberDto> GetUserByIdAsync(int id);

        void UpdateCrewMember(CrewMemberDto crewMember);

        Task<bool> SaveAllAsync();

        void UpdateUser(User user);
    }
}
