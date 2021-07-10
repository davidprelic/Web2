using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Data.Repo
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly DataContext dc;

        public NotificationRepository(DataContext context)
        {
            dc = context;
        }

        public void NewNotification(Notification notification, int userId)
        {
            dc.Notifications.Add(notification);
            dc.NotificationUsers.Add(new NotificationUser() { NotificationId = notification.Id, UserId = userId, Read = false });
                            
        }

        public void AddNotification(Notification notification)
        {
            dc.Notifications.Add(notification);
        }

        public void DeleteNotification(Notification notification)
        {
            dc.Notifications.Remove(notification);
        }

        public async Task<Notification> GetNotificationByIdAsync(int id)
        {
            return await dc.Notifications.FindAsync(id);
        }

        public async Task<List<Notification>> GetNotifications()
        {
            return await dc.Notifications.ToListAsync();
        }

        public void UpdateNotification(Notification notification)
        {
            dc.Entry(notification).State = EntityState.Modified;
        }

        List<Notification> INotificationRepository.GetNotifications()
        {
            return dc.Notifications.ToList();
        }
    }
}
