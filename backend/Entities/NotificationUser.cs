namespace backend.Entities
{
    public class NotificationUser
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int NotificationId { get; set; }
        public Notification Notification { get; set; }
        
        public bool Read { get; set; } = false;
    }
}