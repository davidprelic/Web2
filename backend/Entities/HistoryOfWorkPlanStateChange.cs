using System;

namespace backend.Entities
{
    public class HistoryOfWorkPlanStateChange
    {
        public int Id { get; set; }
        public string ChangedFrom { get; set; }
        public string ChangedTo { get; set; }
        public DateTime DateTimeChanged { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int WorkPlanId { get; set; }
        public WorkPlan WorkPlan { get; set; }
    }
}