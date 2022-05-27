using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

     namespace CartWall.Models
{
    public class CollectProduct
    {
        [Key]
        public int CollectId { get; set; }
        public string ProductId { get; set; }
        public int ShoppingCartId { get; set; }
        public string ImgPath { get; set; }
        public string ProductName { get; set; }
        public string Price { get; set; }
        public string Stock { get; set; }
        public long Amount { get; set; }
        public int Quantity { get; set; }
        public DateTime TimeStamp { get; set; }
        public CollectProduct()
        {
            TimeStamp = DateTime.Now;
          
        }
    }
}
