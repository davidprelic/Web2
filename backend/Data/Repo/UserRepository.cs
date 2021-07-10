using backend.DTOs;
using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Data.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext context;

        public UserRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<int> GetUserIdByUsernameAsync(string username)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == username);

            return user.Id; 
        }

        public async Task<CrewMemberDto> GetUserByIdAsync(int id)
        {
            User user = await context.Users.FindAsync(id);

            CrewMemberDto crewMember = new CrewMemberDto(user.Id, user.FirstName, user.LastName);

            return crewMember;

        }

        public async Task<IEnumerable<CrewMemberDto>> GetUsersAsync(int id)
        {
            ICollection<User> users = await context.Users.ToListAsync();
            ICollection<CrewMemberDto> users2 = new List<CrewMemberDto>();

            foreach (var user in users)
            {
                if (user.UserRole == "CrewMember" && user.CrewId == null)
                {
                    users2.Add(new CrewMemberDto(user.Id, user.FirstName, user.LastName));
                }
            }

            return users2;
        }

        public async Task<IEnumerable<CrewMemberDto>> GetUsersByCrewIdAsync(int id)
        {
            ICollection<User> users = await context.Users.Where(x => x.CrewId == id).ToListAsync();
            ICollection<CrewMemberDto> users2 = new List<CrewMemberDto>();

            foreach (var user in users)
            {
                users2.Add(new CrewMemberDto(user.Id, user.FirstName, user.LastName));
            }

            return users2;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void UpdateCrewMember(CrewMemberDto crewMember)
        {
            context.Entry(crewMember).State = EntityState.Modified;
        }

        public void UpdateUser(User user)
        {
            context.Entry(user).State = EntityState.Modified;
        }
    }
}
