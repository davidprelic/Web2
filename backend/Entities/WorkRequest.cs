using System;
using System.Collections.Generic;

namespace backend.Entities
{
    public class WorkRequest
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string Address { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public DateTime? StartDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }
        public int CreatedBy { get; set; }
        public string Purpose { get; set; }
        public string Notes { get; set; }
        public bool? EmergencyWork { get; set; }
        public string Company { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateTimeCreated { get; set; } = DateTime.Now;

        public int? IncidentId { get; set; }
        public Incident Incident { get; set; }

        public ICollection<HistoryOfWorkRequestStateChange> HistoryOfWorkRequestStateChanges { get; set; }
        public ICollection<WorkRequestPhoto> Photos { get; set; }
        public ICollection<WorkPlan> WorkPlans { get; set; }
        

    }
}