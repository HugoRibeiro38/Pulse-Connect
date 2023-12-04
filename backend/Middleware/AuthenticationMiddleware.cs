using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using PulseConnect.Models;

namespace PulseConnect.Middleware
{
    public class AuthenticationMiddleware : IMiddleware
    {
        private readonly SignInManager<Users> _signInManager;
        private readonly UserManager<Users> _userManager;
        private readonly IConfiguration _configuration;

        public AuthenticationMiddleware(SignInManager<Users> signInManager, UserManager<Users> userManager, IConfiguration configuration)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            if (context.Request.Path == "/api/account/login" && context.Request.Method == "POST")
            {
                await HandleLoginAsync(context);
            }
            else if (context.Request.Path == "/api/account/register" && context.Request.Method == "POST")
            {
                await HandleRegisterAsync(context);
            }
            else
            {
#pragma warning disable CS8602 // Desreferência de uma referência possivelmente nula.
                if (await IsTokenValidAsync(context) && context.User.Identity.IsAuthenticated)
                {
                    context.Response.StatusCode = 200;
                    await context.Response.WriteAsync("Authenticated successfully.");
                    return;
                }
#pragma warning restore CS8602 // Desreferência de uma referência possivelmente nula.

                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Invalid Token or User not Found.");
            }

            await next(context);
        }

        public string GenerateToken(Users user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = GetKeyFromFile();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private async Task HandleLoginAsync(HttpContext context)
        {
            var username = context.Request.Form["username"];
            var password = context.Request.Form["password"];

#pragma warning disable CS8604 // Possível argumento de referência nula.
            var user = await _userManager.FindByNameAsync(username);
#pragma warning restore CS8604 // Possível argumento de referência nula.

            if (user != null)
            {
#pragma warning disable CS8604 // Possível argumento de referência nula.
                var result = await _signInManager.PasswordSignInAsync(user, password, isPersistent: false, lockoutOnFailure: false);
#pragma warning restore CS8604 // Possível argumento de referência nula.

                if (result.Succeeded)
                {
                    context.Response.StatusCode = 200;
                    await context.Response.WriteAsync("Authenticated successfully.");
                    return;
                }
            }

            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Authentication failed.");
        }

        private async Task HandleRegisterAsync(HttpContext context)
        {
            var username = context.Request.Form["username"];
            var password = context.Request.Form["password"];

#pragma warning disable CS8601 // Possível atribuição de referência nula.
            var user = new Users { UserName = username };
#pragma warning restore CS8601 // Possível atribuição de referência nula.

#pragma warning disable CS8604 // Possível argumento de referência nula.
            var result = await _userManager.CreateAsync(user, password);
#pragma warning restore CS8604 // Possível argumento de referência nula.

            if (result.Succeeded)
            {
                context.Response.StatusCode = 200;
                await context.Response.WriteAsync("Registration successful.");
                return;
            }

            context.Response.StatusCode = 400;
            await context.Response.WriteAsync("Registration failed.");
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

#pragma warning disable CS1998 // O método assíncrono não possui operadores 'await' e será executado de forma síncrona
        private async Task<bool> ValidateTokenAsync(string token)
#pragma warning restore CS1998 // O método assíncrono não possui operadores 'await' e será executado de forma síncrona
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

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private byte[] GetKeyFromFile()
        {
            try
            {
#pragma warning disable CS8604 // Possível argumento de referência nula.
                var json = System.IO.File.ReadAllText(_configuration["SecretKeyPath"]);
#pragma warning restore CS8604 // Possível argumento de referência nula.
                var keyObject = JsonConvert.DeserializeAnonymousType(json, new { Secret = "" });

#pragma warning disable CS8602 // Desreferência de uma referência possivelmente nula.
                return Encoding.ASCII.GetBytes(keyObject.Secret);
#pragma warning restore CS8602 // Desreferência de uma referência possivelmente nula.
            }
            catch (Exception)
            {
#pragma warning disable CS8603 // Possível retorno de referência nula.
                return null;
#pragma warning restore CS8603 // Possível retorno de referência nula.
            }
        }
    }
}
