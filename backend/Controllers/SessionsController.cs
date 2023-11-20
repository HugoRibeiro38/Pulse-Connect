using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PulseConnect.Data;
using PulseConnect.Models;
using PulseConnect.Services;

namespace PulseConnect.Controllers
{
    /// <summary>
    /// Controller for managing user sessions.
    /// </summary>
    [ApiController]
    [Route(("api/[controller]"))]
    public class SessionsController : ControllerBase
    {
        private readonly APIDbContext _context;

        /// <summary>
        /// Initialize a new instance of the <see cref="SessionsController"/> class.
        /// </summary>
        /// <param name="sessionContext">The session context.</param>
        /// <param name="configuration">The configuration.</param>

        public SessionsController(APIDbContext sessionContext)
        {
            _context = sessionContext;
        }

        /// <summary>
        /// Gets all user sessions.
        /// </summary>
        /// <returns>The list of user sessions</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Session>>> GetSessions()
        {
            var sessions = await _context.Sessions.ToListAsync();
            if(sessions.Count == 0)
            {
                return NoContent(); //Return 204 No Content
            }
            return sessions;
        }

        /// <summary>
        /// Gets a specific user session by ID.
        /// </summary>
        /// <param name="id">The ID of the session.</param>
        /// <returns>The user session.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Session>> GetSession(string id)
        {
            var session = await _context.Sessions.FindAsync(id);

            if (session == null)
            {
                return NotFound();
            }

            return session;
        }
    }
}
