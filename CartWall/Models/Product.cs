using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CartWall.Models
{
    public class Product 
    {
        public Guid ProductId { get; set; }
        public int CategoryId { get; set; }
        public string ImgPath { get; set; }
        public string ProductName { get; set; }
        public string Price { get; set; }
        public string Stock { get; set; }
        public string Quantity { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public DateTime TimeStamp { get; set; }
        public Product()
        {
            TimeStamp = DateTime.Now;  
            Reviews = new Collection<Review>();
        }
    }
}
