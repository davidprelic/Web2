using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class UserForStatusDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string RegistrationStatus { get; set; }
    }
}
