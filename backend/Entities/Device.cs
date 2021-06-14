using System.Collections.Generic;

namespace backend.Entities
{
    public class Device
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public int? IncidentId { get; set; }
        public Incident Incident { get; set; }

        public ICollection<WorkInstruction> WorkInstructions { get; set; }
    }
}