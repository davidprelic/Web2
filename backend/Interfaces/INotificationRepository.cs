using backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface INotificationRepository
    {
        Task NewNotification(Notification notification, int userId);
        void AddNotification(Notification notification);
        void DeleteNotification(Notification notification);
        void UpdateNotification(Notification notification);
        Task<Notification> GetNotificationByIdAsync(int id);
        List<Notification> GetNotifications();

        Task<bool> SaveAllAsync();
    }
}
