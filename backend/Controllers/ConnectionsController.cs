using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PulseConnect.Data;
using PulseConnect.Models;

namespace PulseConnect.Controllers
{
    [ApiController]
    [Route("api/connections")]
    public class ConnectionsController : ControllerBase
    {
        private readonly APIDbContext _context;

        public ConnectionsController(APIDbContext context)
        {
            _context = context;
        }

        // POST: api/connections/add
        [HttpPost("add")]
        public async Task<ActionResult> AddConnection(Connections connection)
        {
            _context.Connections.Add(connection);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConnection", new { id_connection = connection.ID_Connection }, connection);
        }

        // GET: api/connections/list
        [HttpGet("list")]
        public async Task<ActionResult<IEnumerable<Connections>>> GetConnections()
        {
            var connections = await _context.Connections.ToListAsync();
            return connections;
        }

        // PUT: api/connections/update-status/{id_connection}/pending
        [HttpPut("update-status/{id_connection}/pending")]
        public async Task<ActionResult> UpdateConnectionStatusToPending(string id_connection)
        {
            return await UpdateConnectionStatus(id_connection, ConnectionStatusEnum.Pending);
        }

        // PUT: api/connections/update-status/{id_connection}/accepted
        [HttpPut("update-status/{id_connection}/accepted")]
        public async Task<ActionResult> UpdateConnectionStatusToAccepted(string id_connection)
        {
            return await UpdateConnectionStatus(id_connection, ConnectionStatusEnum.Accepted);
        }

        // PUT: api/connections/update-status/{id_connection}/blocked
        [HttpPut("update-status/{id_connection}/blocked")]
        public async Task<ActionResult> UpdateConnectionStatusToBlocked(string id_connection)
        {
            return await UpdateConnectionStatus(id_connection, ConnectionStatusEnum.Blocked);
        }

        // POST: api/connections
        [HttpPost]
        public async Task<ActionResult<Connections>> PostConnection(Connections connection)
        {
            if (ConnectionExists(connection.ID_Connection))
            {
                return Conflict("Connection already exists.");
            }

            // Certifique-se de inicializar ID_Connection antes de criar o objeto anônimo
            connection.ID_Connection = Guid.NewGuid().ToString();

            _context.Connections.Add(connection);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConnection", new { id_connection = connection.ID_Connection }, connection);
        }

        // DELETE: api/connections/{id_connection}
        [HttpDelete("{id_connection}")]
        public async Task<ActionResult<Connections>> DeleteConnection(string id_connection)
        {
            var connection = await _context.Connections.FindAsync(id_connection);
            if (connection == null)
            {
                return NotFound();
            }

            _context.Connections.Remove(connection);
            await _context.SaveChangesAsync();

            return connection;
        }

        private bool ConnectionExists(string id_connection)
        {
            return _context.Connections.Any(e => e.ID_Connection == id_connection);
        }

        private async Task<ActionResult> UpdateConnectionStatus(string id_connection, ConnectionStatusEnum newStatus)
        {
            var connection = await _context.Connections.FindAsync(id_connection);

            if (connection == null)
            {
                return NotFound();
            }

            connection.Connection_Status = newStatus;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        public class ConnectionRequestModel
        {
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
            public string ID_User_1 { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
            public string ID_User_2 { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        }
    }
}
