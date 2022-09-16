using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace TimeRegistrering.Models
{
    public class TimeRegistration
    {
        [Key]
        public int RegistrationId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string ProjectName { get; set; }
        [Required]
        public string Comment { get; set; }
        [Required]
        public int Hours { get; set; }
        public DateTime RegistrationTime { get; set; }
        public User User { get; set; }
    }
}
