using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CartWall.Models
{
    public class News
    {
        [Required]
        public Guid Id { get; set; }
        
        
        
        public string ImgPath { get; set; }
       
       
        
        public string Title { get; set; }
      
       
       
        public string Body { get; set; }
       
      
  
        public DateTime TimeStamp { get; set; }
        public News()
        {
            TimeStamp = DateTime.Now;

        }
    }
}
