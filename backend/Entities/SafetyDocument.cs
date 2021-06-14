using System;
using System.Collections.Generic;

namespace backend.Entities
{
    public class SafetyDocument
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
        public WorkPlan WorkPlan { get; set; }

        public int? CrewId { get; set; }
        public Crew Crew { get; set; }

        public int? ChecklistId { get; set; }
        public Checklist Checklist { get; set; }

        public ICollection<HistoryOfSafetyDocumentStateChange> HistoryOfSafetyDocumentStateChanges { get; set; }
        public ICollection<SafetyDocumentPhoto> Photos { get; set; }

    }
}