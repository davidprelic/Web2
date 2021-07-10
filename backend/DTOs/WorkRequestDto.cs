using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class WorkRequestDto
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string Address { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public DateTime? StartDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }
        public string CreatedBy { get; set; }
        public string Purpose { get; set; }
        public string Notes { get; set; }
        public bool? EmergencyWork { get; set; }
        public string Company { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateTimeCreated { get; set; }

        public int? IncidentId { get; set; }
    }
}
