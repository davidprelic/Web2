using System;
using System.Collections.Generic;

namespace backend.Entities
{
    public class Incident
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public int? Priority { get; set; }
        public bool isConfirmed { get; set; } 
        public string Status { get; set; }
        public string Location { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public DateTime? EstimatedTimeOfTheCrewArrival { get; set; }
        public DateTime? ActualTimeOfTheCrewArrival { get; set; }
        public DateTime? OutageTime { get; set; }
        public DateTime? EstimatedTimetoRestore { get; set; }
        public int? AffectedCustomers { get; set; }
        public int? NumberOfCalls { get; set; }
        public double? Voltage { get; set; }
        public DateTime? ScheduledTime { get; set; }

        public int? TakenToResolveUserId { get; set; } 
        public User User { get; set; }

        public int? ResolutionId { get; set; }
        public Resolution Resolution { get; set; }

        public int? CrewId { get; set; }
        public Crew Crew { get; set; }
        
        public ICollection<Device> Devices { get; set; }
        public ICollection<Call> Calls { get; set; }
        public ICollection<IncidentPhoto> Photos { get; set; }
        public ICollection<WorkRequest> WorkRequests { get; set; }
        public ICollection<WorkPlan> WorkPlans { get; set; }

    }
}