using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PulseConnect.Data;
using PulseConnect.Models;
using System.Net;
using System.Net.Mail;

namespace PulseConnect.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class PasswordResetController : Controller
    {
        // Declarado contexto da base de dados para conseguir interagir com ela 
        private readonly APIDbContext _context;
        // Usada para gerir os users no contexto da nossa base de dados 
        private readonly UserManager<Users> _userManager;

        //Injeção de Dependências para lidar com gestão users
        //UserManager vem embutido .NET e permite gerir facilmente os Users
        public PasswordResetController(APIDbContext passwordResetContext, UserManager<Users> userManager)
        {
            _context = passwordResetContext ?? throw new ArgumentNullException(nameof(passwordResetContext));
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        }


        [HttpPost("request-password-reset")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RequestPasswordReset([FromBody] String email)
        {
            // Verificar se o e-mail existe na base de dados
            var user = await _userManager.FindByEmailAsync(email);

            if (user != null)
            {
                // Gera um token exclusivo
                var resetToken = Guid.NewGuid().ToString();

                
                var expireDate = DateTime.UtcNow.AddMinutes(15);

                // Armazena o token na base de dados
                var resetRequest = new PasswordReset
                {
                    UserID = user.ID,
                    Token = resetToken,
                    ExpireDate = expireDate
                };

                _context.PasswordResets.Add(resetRequest);
                await _context.SaveChangesAsync();

                // Envie um e-mail com o link de redefinição
                SendResetPasswordEmail(user.UserEmail, resetToken);

                // Retornar dados, por exemplo, o token gerado
                return Ok(new { Token = resetToken });
            }

            // Se o e-mail não for encontrado, retorne um status indicando que a solicitação foi bem-sucedida
            return Ok(new { Success = true });
        }



        //Assegura que os dados vão para o servidor de acordo com um determinado token de validação
        // Gerado pelo servidor e único para cada user e sessão
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(string token, string currentPassword, string newPassword)
        {
            if (ModelState.IsValid)
            {
                // Verifica se há uma solicitação de redefinição de senha válida no banco de dados
                var resetRequest = await _context.PasswordResets
                    .FirstOrDefaultAsync(r => r.Token == token && r.ExpireDate > DateTime.UtcNow);

                if (resetRequest == null)
                {
                    // Token inválido ou expirado
                    return BadRequest("Token inválido ou expirado.");
                }

                // Obtenha o usuário associado à solicitação de redefinição
                var user = await _userManager.FindByIdAsync(resetRequest.UserID);

                if (user != null)
                {
                    // Verifica a senha atual antes de prosseguir
                    var isCurrentPasswordValid = await _userManager.CheckPasswordAsync(user, currentPassword);

                    if (isCurrentPasswordValid)
                    {
                        // Use UserManager para redefinir a senha em HashCode
                        var resetPasswordResult = await _userManager.ResetPasswordAsync(user, token, newPassword);

                        if (resetPasswordResult.Succeeded)
                        {
                            // Remove a solicitação de redefinição de senha após a conclusão bem-sucedida
                            _context.PasswordResets.Remove(resetRequest);
                            await _context.SaveChangesAsync();

                            return Ok("Redefinição de senha concluída com sucesso.");
                        }
                        else
                        {
                            // Algo deu errado durante a redefinição de senha
                            // Você pode acessar os detalhes do erro em resetPasswordResult.Errors
                            return BadRequest("Falha na redefinição de senha.");
                        }
                    }
                    else
                    {
                        // Senha atual inválida
                        return BadRequest("Senha atual inválida.");
                    }
                }
            }

            return BadRequest("Falha na redefinição de senha.");
        }


        private void SendResetPasswordEmail(string userEmail, string resetToken)
        {
            
            var resetUrl = $"https://localhost/PasswordReset/ResetPassword?token={resetToken}";

            var smtpClient = new SmtpClient()
            {
                Port = 587,
                Credentials = new NetworkCredential("lds.pulseconnect@gmail.com", "frmu pvee jngb bmkn"),
                EnableSsl = true,
        };
            var mailMessage = new MailMessage
            {
                From = new MailAddress("lds.pulseconnect@gmail.com"),
                Subject = "Redefinição de Senha",
                Body = $"Clique no link a seguir para redefinir sua senha: {resetUrl}",
                IsBodyHtml = false
            };

            mailMessage.To.Add(userEmail);

            smtpClient.Send(mailMessage);
        }


    }

}


