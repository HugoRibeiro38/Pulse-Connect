namespace PulseConnect.Services
{
    public interface IJwtTokenService
    {
        string GenerateToken(string userID);
        bool ValidateToken(string token);
        string RefreshJwtToken(string token);
    }
}
