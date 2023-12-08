using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PulseConnect.Data;
using PulseConnect.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PulseConnect.Controllers
{
    /// <summary>
    /// Controller for managing third-party accounts.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ThirdPartyAccountController : ControllerBase
    {
        private readonly APIDbContext _context;

        /// <summary>
        /// Initializes a new instance of the <see cref="ThirdPartyAccountController"/> class.
        /// </summary>
        /// <param name="context">The database context.</param>
        public ThirdPartyAccountController(APIDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Gets a list of all third-party accounts.
        /// </summary>
        /// <returns>The list of third-party accounts.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ThirdPartyAccount>>> GetThirdPartyAccounts()
        {
            var accounts = await _context.ThirdPartyAccounts.ToListAsync();
            if (accounts.Count == 0)
            {
                return NoContent();
            }
            return accounts;
        }

        /// <summary>
        /// Gets a specific third-party account by ID.
        /// </summary>
        /// <param name="id">The ID of the third-party account.</param>
        /// <returns>The third-party account.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<ThirdPartyAccount>> GetThirdPartyAccount(int id)
        {
            var account = await _context.ThirdPartyAccounts.FindAsync(id);

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        /// <summary>
        /// Creates a new third-party account.
        /// </summary>
        /// <param name="thirdPartyAccount">The third-party account to create.</param>
        /// <returns>The created third-party account.</returns>
        [HttpPost]
        public async Task<ActionResult<ThirdPartyAccount>> CreateThirdPartyAccount(ThirdPartyAccount thirdPartyAccount)
        {
            _context.ThirdPartyAccounts.Add(thirdPartyAccount);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetThirdPartyAccount", new { id = thirdPartyAccount.ThirdPartyAccountId }, thirdPartyAccount);
        }

        /// <summary>
        /// Updates an existing third-party account.
        /// </summary>
        /// <param name="id">The ID of the third-party account to update.</param>
        /// <param name="thirdPartyAccount">The updated third-party account.</param>
        /// <returns>No content.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateThirdPartyAccount(int id, ThirdPartyAccount thirdPartyAccount)
        {
            if (id != thirdPartyAccount.ThirdPartyAccountId)
            {
                return BadRequest();
            }

            _context.Entry(thirdPartyAccount).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ThirdPartyAccountExists(id))
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

        /// <summary>
        /// Deletes a third-party account by ID.
        /// </summary>
        /// <param name="id">The ID of the third-party account to delete.</param>
        /// <returns>No content.</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteThirdPartyAccount(int id)
        {
            var account = await _context.ThirdPartyAccounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            _context.ThirdPartyAccounts.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Checks if a third-party account with the specified ID exists.
        /// </summary>
        /// <param name="id">The ID to check.</param>
        /// <returns>True if the account exists, otherwise false.</returns>
        private bool ThirdPartyAccountExists(int id)
        {
            return _context.ThirdPartyAccounts.Any(e => e.ThirdPartyAccountId == id);
        }
    }
}
