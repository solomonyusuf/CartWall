using CartWall.Data;
using CartWall.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartWall.Controllers
{

    [ApiController]
    [Authorize(Roles = "Admin,Manager")]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("api/[controller]/card")]
        public async Task<ActionResult<IEnumerable<Card>>> GetCard()
        {
            return await _context.Card.OrderByDescending(o => o.CardId).ToListAsync();
        }

        [HttpGet]
        [Route("api/[controller]/category")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategory()
        {

            return await _context.Category.ToListAsync();
        }

        [HttpGet]
        [Route("api/[controller]/contact")]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContact()
        {
            return await _context.Contact.OrderByDescending(o => o.Id).ToListAsync();
        }

        [HttpGet]
        [Route("api/[controller]/news")]
        public async Task<ActionResult<IEnumerable<News>>> GetNews()
        {
            return await _context.News.ToListAsync();
        }
        [HttpGet]
        [Route("api/[controller]/orders")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {

            return await _context.Orders.OrderByDescending(o => o.OrderId)
                .ToListAsync();
        }
        [HttpGet]
        [Route("api/[controller]/pending")]
        public async Task<ActionResult<IEnumerable<Order>>> GetPending()
        {

            return await _context.Orders.Where(o => o.Status == "pending")
                .ToListAsync();
        }
        [HttpGet]
        [Route("api/[controller]/delivered")]
        public async Task<ActionResult<IEnumerable<Order>>> Getdelivered()
        {

            return await _context.Orders.Where(o => o.Status == "delivered")
                .ToListAsync();
        }
        [HttpGet]
        [Route("api/[controller]/products")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {

            return await _context.Product.OrderByDescending(o => o.ProductId).ToListAsync();
        }

        [HttpGet]
        [Route("api/[controller]/roles")]
        public async Task<ActionResult<IEnumerable<Role>>> GetRoles()
        {
            return await _context.Role
                .ToListAsync();
        }
        [HttpGet]
        [Route("api/[controller]/reviews")]
        public async Task<ActionResult<IEnumerable<Review>>> GetReview()
        {
            return await _context.Review.OrderByDescending(o => o.ReviewId).ToListAsync();
        }

        [HttpGet]
        [Route("api/[controller]/cart")]
        public async Task<ActionResult<IEnumerable<ShoppingCart>>> GetShoppingCart()
        {

            return await _context.ShoppingCart.OrderByDescending(o => o.ShoppingCartId)
                .ToListAsync();
        }

        [HttpGet]
        [Route("api/[controller]/users")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetUsers()
        {
            return await _context.Users.OrderByDescending(o => o.Id)
                .ToListAsync();
        }







    }
}
