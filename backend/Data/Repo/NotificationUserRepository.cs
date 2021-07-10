using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Data.Repo
{
    public class NotificationUserRepository : INotificationUserRepository
    {
        private readonly DataContext dc;

        public NotificationUserRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public void AddNotificationUser(NotificationUser notificationUser)
        {
            dc.NotificationUsers.Add(notificationUser);
        }

        public void DeleteNotificationUser(NotificationUser notificationUser)
        {
            dc.NotificationUsers.Remove(notificationUser);
        }

        public NotificationUser GetNotificationUserByIdAsync(int userId, int notId)
        {
            return dc.NotificationUsers.FirstOrDefault(x => x.UserId == userId && x.NotificationId == notId);
        }

        public Task<IEnumerable<NotificationUser>> GetNotificationUsers()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<NotificationUser>> GetNotificationUsersForOneUser(int id)
        {
            return await dc.NotificationUsers
                .Where(x => x.UserId == id)
                .ToListAsync();
        }

        public async Task<IEnumerable<NotificationUser>> GetReadNotificationUsersForOneUser(int id)
        {
            return await dc.NotificationUsers
                .Where(x => x.UserId == id && x.Read == true)
                .ToListAsync();
        }

        public async Task<IEnumerable<NotificationUser>> GetUnreadNotificationUsersForOneUser(int id)
        {
            return await dc.NotificationUsers
                .Where(x => x.UserId == id && x.Read == false)
                .ToListAsync();
        }

        public void Update(NotificationUser notificationUser)
        {
            dc.Entry(notificationUser).State = EntityState.Modified;
        }

        List<NotificationUser> INotificationUserRepository.GetNotificationUsersForOneUser(int id)
        {
            return dc.NotificationUsers.ToList();
        }
    }
}
