using System;

namespace backend.Entities
{
    public class HistoryOfWorkRequestStateChange
    {
        public int Id { get; set; }
        public string ChangedFrom { get; set; }
        public string ChangedTo { get; set; }
        public DateTime DateTimeChanged { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int WorkRequestId { get; set; }
        public WorkRequest WorkRequest { get; set; }

    }
}