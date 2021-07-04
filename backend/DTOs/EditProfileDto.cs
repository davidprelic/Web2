using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class EditProfileDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }

        public string OldPassword { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string UserRole { get; set; }
        public string NewPassword { get; set; }

    }
}
