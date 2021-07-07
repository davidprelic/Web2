using System;

namespace backend.DTOs
{
    public class HistorySafetyDocDto
    {
        public int Id { get; set; }
        public string ChangedFrom { get; set; }
        public string ChangedTo { get; set; }
        public DateTime DateTimeChanged { get; set; }

        public int UserId { get; set; }

        public int SafetyDocumentId { get; set; }
    }
}