using CartWall.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartWall.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Order> Orders { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<News> News { get; set; }
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
        public DbSet<CartWall.Models.Card> Card { get; set; }
        public DbSet<CartWall.Models.Contact> Contact { get; set; }
        public DbSet<CartWall.Models.Product> Product { get; set; }
        public DbSet<CartWall.Models.Review> Review { get; set; }
        public DbSet<CartWall.Models.ShoppingCart> ShoppingCart { get; set; }
        public DbSet<CartWall.Models.CollectProduct> CollectProduct { get; set; }
        public DbSet<CartWall.Models.Role> Role { get; set; }
        public DbSet<CartWall.Models.UserRole> UserRole { get; set; }
    }
}
