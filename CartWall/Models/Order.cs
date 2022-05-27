using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CartWall.Models
{
    public class Order
    {
        public Guid OrderId { get; set; }
        public string ApplicationUserId { get; set; }
        public string FirstName { get; set; }     
        public string LastName { get; set; }           
        public string Address_1 { get; set; }       
        public string Address_2 { get; set; }
        public string PhoneNumber_1 { get; set; }
        public string PhoneNumber_2 { get; set; }
        public string Amount { get; set; }
        public ICollection<Card> Cards { get; set; }
        public string Status { get; set; }
        public DateTime TimeStamp { get; set; }
        public Order()
        {
            Cards = new Collection<Card>();    
            TimeStamp = DateTime.Now;
           
        }
    }
}
