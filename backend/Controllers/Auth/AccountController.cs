using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PulseConnect.Models;
using PulseConnect.Middleware;

namespace PulseConnect.Controllers.Auth
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<Users> _signInManager;
        private readonly UserManager<Users> _userManager;
        private readonly AuthenticationMiddleware _tokenService;

        public AccountController(SignInManager<Users> signInManager, UserManager<Users> userManager, AuthenticationMiddleware tokenService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
        }

       
        /// <summary>
        /// Login Function
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns>Token when is successfully logged</returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login(String username, String password)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user != null)
            {
                var result = await _signInManager.CheckPasswordSignInAsync(user, password, lockoutOnFailure: false);

                if (result.Succeeded)
                {
                    // Autenticação bem-sucedida, gera e retorna o token
                    var token = _tokenService.GenerateToken(user);
                    return Ok(new { Token = token });
                }
            }

            // Tratamento para falha na autenticação
            return Unauthorized();
        }


        /// <summary>
        /// Register function using JWT for inject token in session when user create a account
        /// </summary>
        /// <param name="username"> Username from user</param>
        /// <param name="password"> Password from user</param>
        /// <returns>Token Generated for Users</returns>
        [HttpPost("register")] // Rota específica para o método Register
        public async Task<IActionResult> Register(string username, string password)
        {
            var user = new Users { UserName = username };

            var result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                // Registro bem-sucedido, gera e retorna o token
                var token = _tokenService.GenerateToken(user);
                return Ok(new { Token = token });
            }

            // Tratamento para falha no registro
            return BadRequest(result.Errors);
        }


    }
}
