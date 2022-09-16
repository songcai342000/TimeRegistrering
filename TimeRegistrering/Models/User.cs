using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TimeRegistrering.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [EmailAddress]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        public string UserType { get; set; }
        public List<TimeRegistration> TimeRegistrations { get; set; }

    }
}
