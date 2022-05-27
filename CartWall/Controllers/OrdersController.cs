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
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ShoppingCartsController _shoppingCartController;
        private readonly CardsController _cardsController;

        public OrdersController(ApplicationDbContext context,
             ShoppingCartsController shoppingCartController,
             CardsController cardsController
            )
        {
            _context = context;
            _shoppingCartController = shoppingCartController;
            _cardsController = cardsController;
        }





        // GET: api/Orders
        [HttpGet]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {

            return await _context.Orders.OrderByDescending(o => o.OrderId)
                .Include(o => o.Cards)
                .ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        [Authorize(Roles = "User,Admin,Manager")]
        public async Task<ActionResult<Order>> GetOrder(Guid id)
        {
            await _cardsController.GetCard();
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutOrder(Guid id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "User,Admin,Manager")]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "User,Admin,Manager")]
        public async Task<IActionResult> DeleteOrder(Guid id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(Guid id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
