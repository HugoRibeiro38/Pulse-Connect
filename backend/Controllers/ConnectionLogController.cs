using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PulseConnect.Data;
using PulseConnect.Models;

namespace PulseConnect.Controllers
{
    [Route("connections/logs")]
    public class ConnectionLogsController : ControllerBase
    {
        private readonly APIDbContext _context;

        public ConnectionLogsController(APIDbContext context)
        {
            _context = context;
        }

        // POST /connections/logs
        [HttpPost("add")]
        public async Task<IActionResult> AddLog([FromBody] ConnectionLog log)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ConnectionLogs.Add(log);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLogById", new { id = log.ID_Log }, log);
        }

        // GET /connections/log/{id}
        [HttpGet("log/{id}")]
        public async Task<IActionResult> GetLogById(string id)
        {
            var log = await _context.ConnectionLogs.FindAsync(id);

            if (log == null)
            {
                return NotFound();
            }

            return Ok(log);
        }

        // GET /connections/logs?filter[connection]=id_connection
        [HttpGet]
        [ApiExplorerSettings(GroupName = "LogsByConnection")]
        public async Task<IActionResult> GetLogsByConnection([FromQuery] string filter)
        {
            var logs = await _context.ConnectionLogs
                .Where(log => log.ID_Connection == filter)
                .ToListAsync();

            return Ok(logs);
        }

        // GET /connections/logs?filter[date]=yyyymmdd
        [HttpGet]
        [ApiExplorerSettings(GroupName = "LogsByDate")]
        public async Task<IActionResult> GetLogsByDate([FromQuery] string filter)
        {
            if (DateTime.TryParseExact(filter, "yyyyMMdd", null, System.Globalization.DateTimeStyles.None, out var parsedDate))
            {
                var logs = await _context.ConnectionLogs
                    .Where(log => log.Action_Date.Date == parsedDate.Date)
                    .ToListAsync();

                return Ok(logs);
            }

            return BadRequest("Invalid date format. Use yyyymmdd");
        }

        // GET /connections/logs/last
        [HttpGet("last")]
        public async Task<IActionResult> GetLastLog()
        {
            var lastLog = await _context.ConnectionLogs
                .OrderByDescending(log => log.Action_Date)
                .FirstOrDefaultAsync();

            if (lastLog == null)
            {
                return NotFound();
            }

            return Ok(lastLog);
        }
    }
}
