using System;
using System.Collections.Generic;

namespace backend.Entities
{
    public class Notification
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Content { get; set; }
        public DateTime DateTimeCreated { get; set; } = DateTime.Now;

        public ICollection<NotificationUser> NotificationUsers { get; set; }

    }
}