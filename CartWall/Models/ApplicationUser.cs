using Microsoft.AspNetCore.Identity;
using CartWall.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace CartWall.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string ImgPath { get; set; }
        public string Role { get; set; }
        public ICollection<ShoppingCart> ShoppingCarts { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ApplicationUser()
        {
             
            Orders = new Collection<Order>();
            ShoppingCarts = new Collection<ShoppingCart>();
        }

    }
}
