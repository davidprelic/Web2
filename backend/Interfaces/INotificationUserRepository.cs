using backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface INotificationUserRepository
    {
        void AddNotificationUser(NotificationUser notificationUser);
        void DeleteNotificationUser(NotificationUser notificationUser);
        void Update(NotificationUser notificationUser);
        NotificationUser GetNotificationUserByIdAsync(int userId, int notId);
        Task<IEnumerable<NotificationUser>> GetNotificationUsers();
        Task<IEnumerable<NotificationUser>> GetUnreadNotificationUsersForOneUser(int id);
        Task<IEnumerable<NotificationUser>> GetReadNotificationUsersForOneUser(int id);
        List<NotificationUser> GetNotificationUsersForOneUser(int id);
    }
}
