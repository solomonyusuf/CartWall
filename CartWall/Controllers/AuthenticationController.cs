using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CartWall.Data;
using CartWall.Models;
using Microsoft.AspNetCore.Authorization;

namespace CartWall.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthenticationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly CardsController _cardsController;
        private readonly CollectProductController _productsController;
        private readonly ReviewsController _reviewController;
        private readonly ShoppingCartsController _shoppingCartController;
        private readonly OrdersController _ordersController;

        public AuthenticationController(ApplicationDbContext context,
             CardsController cardsController,
             CollectProductController productsController,
              ReviewsController reviewController,
              ShoppingCartsController shoppingCartController,
              OrdersController ordersController
             )
        {
            _context = context;
            _cardsController = cardsController;
            _productsController = productsController;
            _reviewController = reviewController;
            _shoppingCartController = shoppingCartController;
            _ordersController = ordersController;
        }


        // GET: api/Authentication
        [HttpGet]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetUsers()
        {
            await _productsController.GetCollectProduct();
            await _cardsController.GetCard();
            return await _context.Users.OrderByDescending(o => o.Id)
                .Include(a => a.ShoppingCarts)
                .Include(a => a.Orders)
                .ToListAsync();
        }

        // GET: api/Authentication/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<ApplicationUser>> GetApplicationUser(string id)
        {
            await _ordersController.GetOrders();
            await _shoppingCartController.GetShoppingCart();
            await _productsController.GetCollectProduct();
            await _cardsController.GetCard();
            var applicationUser = await _context.Users.FindAsync(id);

            if (applicationUser == null)
            {
                return NotFound();
            }

            return applicationUser;
        }

        // PUT: api/Authentication/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutApplicationUser(string id, ApplicationUser applicationUser)
        {
            if (id != applicationUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(applicationUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApplicationUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Authentication
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ApplicationUser>> PostApplicationUser(ApplicationUser applicationUser)
        {
            _context.Users.Add(applicationUser);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ApplicationUserExists(applicationUser.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetApplicationUser", new { id = applicationUser.Id }, applicationUser);
        }

        // DELETE: api/Authentication/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteApplicationUser(string id)
        {
            var applicationUser = await _context.Users.FindAsync(id);
            if (applicationUser == null)
            {
                return NotFound();
            }

            _context.Users.Remove(applicationUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ApplicationUserExists(string id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
