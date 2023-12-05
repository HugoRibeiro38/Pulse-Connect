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


            var user = await _userManager.FindByNameAsync(username);


            if (user != null)
            {
                var result = await _signInManager.PasswordSignInAsync(user, password, isPersistent: false, lockoutOnFailure: false);


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


            var user = new Users { UserName = username };


            var result = await _userManager.CreateAsync(user, password);


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

                var json = System.IO.File.ReadAllText(_configuration["SecretKeyPath"]);

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
