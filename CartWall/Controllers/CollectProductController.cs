using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CartWall.Data;
using CartWall.Models;
using Microsoft.AspNetCore.Authorization;

namespace CartWall.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CollectProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CollectProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CollectProduct
        [HttpGet]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<ActionResult<IEnumerable<CollectProduct>>> GetCollectProduct()
        {
            return await _context.CollectProduct.ToListAsync();
        }

        // GET: api/CollectProduct/5
        [HttpGet("{id}")]
        [Authorize(Roles = "User,Admin,Manager")]
        public async Task<ActionResult<CollectProduct>> GetCollectProduct(int id)
        {
            var collectProduct = await _context.CollectProduct.FindAsync(id);

            if (collectProduct == null)
            {
                return NotFound();
            }

            return collectProduct;
        }

        // PUT: api/CollectProduct/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "User,Admin,Manager")]
        public async Task<IActionResult> PutCollectProduct(int id, CollectProduct collectProduct)
        {
            if (id != collectProduct.CollectId)
            {
                return BadRequest();
            }

            _context.Entry(collectProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CollectProductExists(id))
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

        // POST: api/CollectProduct
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "User,Admin,Manager")]
        public async Task<ActionResult<CollectProduct>> PostCollectProduct(CollectProduct collectProduct)
        {
            _context.CollectProduct.Add(collectProduct);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCollectProduct", new { id = collectProduct.CollectId }, collectProduct);
        }

        // DELETE: api/CollectProduct/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "User,Admin,Manager")]
        public async Task<IActionResult> DeleteCollectProduct(int id)
        {
            var collectProduct = await _context.CollectProduct.FindAsync(id);
            if (collectProduct == null)
            {
                return NotFound();
            }

            _context.CollectProduct.Remove(collectProduct);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CollectProductExists(int id)
        {
            return _context.CollectProduct.Any(e => e.CollectId == id);
        }
    }
}
