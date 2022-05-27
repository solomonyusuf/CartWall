using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartWall.Models
{
    public class Review
    {
        public Guid ReviewId { get; set; }
        public Guid ProductId { get; set; }
        public string Body { get; set; }
        public DateTime TimeStamp { get; set; }
        public Review()
        {
            TimeStamp = DateTime.Now;
           
        }
    }
}
