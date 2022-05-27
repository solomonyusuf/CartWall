using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CartWall.Models
{
    public class Contact
    {
        [Required]
        public Guid Id { get; set; }
        
        [Display(Name = "Full Name")]
        
        public string FullName { get; set; }
       
        [Display(Name = "Phone Number")]
        
        public string PhoneNumber { get; set; }
      
        [Display(Name = "Email")]
       
        public string Email { get; set; }
       
        [Display(Name = "Message")]
        [StringLength(225)]
        public string Message { get; set; }
        public DateTime TimeStamp { get; set; }
        public Contact()
        {
            TimeStamp = DateTime.Now;

        }
    }
}
