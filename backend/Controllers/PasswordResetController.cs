using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PulseConnect.Data;
using PulseConnect.Models;

namespace PulseConnect.Controllers
{
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



        //Assegura que os dados vão para o servidor de acordo com um determinado token de validação
        // Gerado pelo servidor e único para cada user e sessão
        [HttpPost]
        [ValidateAntiForgeryToken]

        public async Task<IActionResult> ResetPassword(string token, string currentPassword, string newPassword, string confirmNewPassword)
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

                // Verifica se a nova senha e a confirmação são iguais
                if (newPassword != confirmNewPassword)
                {
                    return BadRequest("A confirmação da senha não coincide com a nova senha.");
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

    }

}


