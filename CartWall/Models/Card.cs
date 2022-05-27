using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CartWall.Models
{
    public class Card
    {
        [Required]
        public Guid CardId { get; set; }
        public Guid OrderId { get; set; }       
        public string CardNo { get; set; }
        public string CardDate { get; set; }     
        public string CardCode { get; set; }
        public string CardType { get; set; }
        public DateTime TimeStamp { get; set; }
        public Card()
        {
            TimeStamp = DateTime.Now;

        }
    }
}
