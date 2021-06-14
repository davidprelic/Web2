using System.Collections.Generic;

namespace backend.Entities
{
    public class Crew
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<User> Users { get; set; }
        // public ICollection<CrewMember> CrewMembers { get; set; }
        public ICollection<Incident> Incidents { get; set; }
        public ICollection<SafetyDocument> SafetyDocuments { get; set; }
        public ICollection<WorkPlan> WorkPlans { get; set; }
    }
}