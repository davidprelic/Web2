using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class HistoryWorkRequestDto
    {
        public int Id { get; set; }
        public string ChangedFrom { get; set; }
        public string ChangedTo { get; set; }
        public DateTime DateTimeChanged { get; set; }

        public int? UserId { get; set; }

        public int? WorkRequestId { get; set; }
    }
}
