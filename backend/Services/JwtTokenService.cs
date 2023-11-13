using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PulseConnect.Services
{
    public class JwtTokenService : IJwtTokenService
    {

        private readonly IConfiguration _configuration;


        public JwtTokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        public string GenerateToken(string userID)
        {
           var secretKey = _configuration["Jwt:Key"] ?? throw new Exception("Secret Key is null");


            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);


            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("id", userID)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public string RefreshJwtToken(string token)
        {
            throw new NotImplementedException();
        }

        public bool ValidateToken(string token)
        {
           
            var secretKey = _configuration["Jwt:Key"] ?? throw new Exception("Secret Key is null");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),

                    ValidateIssuer = false,
                    ValidateAudience = false,

                    //Set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
