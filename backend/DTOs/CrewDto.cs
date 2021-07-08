using backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class CrewDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<CrewMemberDto> Users { get; set; }
    }
}
