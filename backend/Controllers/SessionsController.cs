using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
        private readonly IJwtTokenService _JwtTokenService;

        /// <summary>
        /// Initialize a new instance of the <see cref="SessionsController"/> class.
        /// </summary>
        /// <param name="sessionContext">The session context.</param>
        /// <param name="configuration">The configuration.</param>

        public SessionsController(APIDbContext sessionContext, IJwtTokenService jwtTokenService)
        {
            _context = sessionContext;
            _JwtTokenService = jwtTokenService;
        }

        /// <summary>
        /// Gets all user sessions.
        /// </summary>
        /// <returns>The list of user sessions</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sessions>>> GetSessions()
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
        public async Task<ActionResult<Sessions>> GetSession(string id)
        {
            var session = await _context.Sessions.FindAsync(id);

            if (session == null)
            {
                return NotFound();
            }

            return session;
        }



        // TODO: Devo colocar o CreateSession, EndSession e EndSessionInternal aqui? 

        //Function to create a new session, that will be used later in the Login function

        /// <summary>
        /// Creates a new session for a user.
        /// </summary>
        /// <param name="userID">The ID of the user.</param>
        /// <param name="JwtToken">The JwtToken created by the login process.</param>
        /// <returns>The session token.</returns>
        public async Task<string> CreateSession(string userID, string JwtToken)
        {

            if (!_JwtTokenService.ValidateToken(JwtToken)) { 
            throw new Exception("Invalid JWT Token");
            }

            var session = new Sessions
            {
                SessionID = Guid.NewGuid().ToString(),
                UserID = userID,
                SessionStartTime = DateTime.Now,
                SessionToken = JwtToken
            };

            _context.Sessions.Add(session);
            await _context.SaveChangesAsync();

            return session.SessionToken;
        }

        /// <summary>
        /// Ends a user session by marking the end time.
        /// </summary>
        /// <param name="sessionID">The Id of the session to end.</param>
        /// <returns></returns>
        public async Task EndSession(string sessionID)
        {
                var session = await _context.Sessions.FindAsync(sessionID);

                if (session != null)
                {
                    session.SessionEndTime = DateTime.Now;
                    session.SessionToken = null;
                    _context.Sessions.Update(session);
                    await _context.SaveChangesAsync();
                }  
        }


        public async Task EndSessionInternal(string sessionID, bool forceEnd = false)
        {
            var session = await _context.Sessions.FindAsync(sessionID);

            if (session != null && (forceEnd || session.SessionEndTime == null))
            {
                session.SessionEndTime = DateTime.Now;
                _context.Sessions.Update(session);
                await _context.SaveChangesAsync();
            }
            // Optionally, you can handle cases where the session is already ended or doesn't exist.
            else if (session == null)
            {
                // Handle case where the session doesn't exist
                throw new ArgumentException($"Session with ID {sessionID} not found.");
            }
            else if (!forceEnd && session.SessionEndTime != null)
            {
                // Handle case where the session is already ended
                throw new InvalidOperationException($"Session with ID {sessionID} is already ended.");
            }
        }



    }
}
