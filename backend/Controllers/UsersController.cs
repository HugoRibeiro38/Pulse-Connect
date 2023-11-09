using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PulseConnect.Data;
using PulseConnect.Models;

namespace PulseConnect.Controllers
{
    [ApiController]
    [Route(("api/users"))]
    public class UsersController : ControllerBase
    {
        private readonly APIDbContext _context;

        public UsersController(APIDbContext usersContext)
        {
            _context = usersContext;
        }

        // GET: api/users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users
          .Select(user => UserInfo(user))
          .ToListAsync();

            return Ok(users);
        }
  
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST: api/users
        [HttpPost]
        public async Task<IActionResult> PostUser(Users user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.ID }, user);
        }

        // PUT: api/users/1
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, Users user)
        {
            if (id != user.ID)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

          
            var responseMessage = new { message = $"{user.ID} atualizado com sucesso" };
            return Ok(responseMessage);
        }

        // DELETE: api/users/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            var responseMessage = new { message = $"{user.ID} removido com sucesso" };
            return Ok(responseMessage);
        }



        /*
         * Função para filtrar os campos a obter da tabela users da base de dados
         */
        private object UserInfo(Users user)
        {
            return new
            {
                user.ID,
                user.UserName,
                user.UserEmail,
                user.BIO,
                user.Date_Created,
                user.Profile_Picture_URL,
                user.Gender,
                user.Country,
            };
        }

        /// Função para verificar se um utilizador existe
        /// <param name="id"> ID do utilizador a verificar</param>
        /// <returns>Boolean</returns>
        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.ID == id);
        }

    }
}
