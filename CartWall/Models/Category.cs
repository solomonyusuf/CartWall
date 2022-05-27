using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CartWall.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string ImgPath { get; set; }
        public string Name { get; set; }
        public ICollection<Product> Products { get; set; }
        public DateTime TimeStamp { get; set; }
        public Category()
        {
            Products = new Collection<Product>();
            TimeStamp = DateTime.Now;
           
        }
    }
}
