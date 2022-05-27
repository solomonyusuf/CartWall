using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

     namespace CartWall.Models
{
    public class ShoppingCart
    {
        [Key]
        public int ShoppingCartId { get; set; }
        public string ApplicationUserId { get; set; }
        public ICollection<CollectProduct> Products { get; set; }
        public DateTime TimeStamp { get; set; }
        public ShoppingCart()
        {
            ApplicationUserId = Guid.NewGuid().ToString();
            TimeStamp = DateTime.Now;
            Products = new Collection<CollectProduct>(); 
        }
    }
}
