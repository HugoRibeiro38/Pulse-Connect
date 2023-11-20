using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using PulseConnect.Models;

namespace PulseConnect.Middleware
{
    public class AuthenticationMiddleware
    {
        private string keyFilePath = "Config/secretkey.json";

        private readonly RequestDelegate _next;
        private readonly SignInManager<Users> _signInManager;
        private readonly UserManager<Users> _userManager;

        public AuthenticationMiddleware(RequestDelegate next, SignInManager<Users> signInManager, UserManager<Users> userManager)
        {
            _next = next;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task Invoke(HttpContext context)
        {
            //case-insensitive por padrão, ou seja, ao tentar aceder account ele reconhece que é do controller Account 
            if (context.Request.Path == "/api/account/login" && context.Request.Method == "POST")
            {
                await HandleLoginAsync(context);
            }
            //case-insensitive por padrão, ou seja, ao tentar aceder account ele reconhece que é do controller Account 
            else if (context.Request.Path == "/api/account/register" && context.Request.Method == "POST")
            {
                await HandleRegisterAsync(context);
            }
            else
            {
                if (await IsTokenValidAsync(context) && context.User.Identity.IsAuthenticated)
                {
                    await _next(context);
                    return;
                }

                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Invalid Token or User not Found.");
            }
        }

        public string GenerateToken(Users user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = GetKeyFromFile();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserName), // Cria uma variável name que vai guardar o username autenticado
                }),
                Expires = DateTime.UtcNow.AddHours(1), // Expira em uma hora o token
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


        private async Task HandleLoginAsync(HttpContext context)
        {
            var username = context.Request.Form["username"];
            var password = context.Request.Form["password"];

            var user = await _userManager.FindByNameAsync(username);

            if (user != null)
            {
                var result = await _signInManager.PasswordSignInAsync(user, password, isPersistent: false, lockoutOnFailure: false);

                if (result.Succeeded)
                {
                    context.Response.StatusCode = 200; 
                    await context.Response.WriteAsync("Autenticação bem-sucedida.");
                    return;
                }
            }

            
            context.Response.StatusCode = 401; 
            await context.Response.WriteAsync("Falha na autenticação.");
        }

        private async Task HandleRegisterAsync(HttpContext context)
        {
            var username = context.Request.Form["username"];
            var password = context.Request.Form["password"];

            var user = new Users { UserName = username };

            var result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                // Registro bem-sucedido
                context.Response.StatusCode = 200; // OK
                await context.Response.WriteAsync("Registro bem-sucedido.");
                return;
            }

            // Tratamento para falha no registro
            context.Response.StatusCode = 400; // Bad Request
            await context.Response.WriteAsync("Falha no registro.");
        }

        private async Task<bool> IsTokenValidAsync(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
            {
                var result = await ValidateTokenAsync(token);

                return result;
            }

            return false;
        }

        /// <summary>
        /// Function to validate token async
        /// </summary>
        /// <param name="token"> Token</param>
        /// <returns></returns>
        private async Task<bool> ValidateTokenAsync(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = GetKeyFromFile();
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false, 
                    ValidateAudience = false, 
                    ValidateLifetime = true
                };

                SecurityToken validatedToken;
                var principal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);

                return true; // O token é válido
            }
            catch (Exception)
            {
                // Em caso de falha na validação do token
                return false;
            }
        }

        private byte[] GetKeyFromFile()
        {
            try
            {
                var json = System.IO.File.ReadAllText(keyFilePath);
                var keyObject = JsonConvert.DeserializeAnonymousType(json, new { Secret = "" });

                return Encoding.ASCII.GetBytes(keyObject.Secret);
            }
            catch (Exception)
            {
                return null;
            }
        }


    }
}
