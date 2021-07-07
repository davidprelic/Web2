using System;

namespace backend.DTOs
{
    public class SafetyDocDto
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string Details { get; set; }
        public string Notes { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime? DateTimeCreated { get; set; }
        public int CreatedBy { get; set; }
        
        public int? WorkPlanId { get; set; }

        public int? CrewId { get; set; }

        public int? ChecklistId { get; set; }

    }
}