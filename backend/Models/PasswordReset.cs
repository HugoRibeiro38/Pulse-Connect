using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PulseConnect.Models
{
    [Table("PasswordReset")]
    public class PasswordReset
    {
        [Key]
        [Column("id")]
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public String ID { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

        [ForeignKey("UserID")]
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public Users User { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

        [Column("user_id")]
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public String UserID { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

        [Column("Token")]
        [MaxLength(1024)]
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public String Token { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

        [Column("Expire_Date")]
        public DateTime ExpireDate { get; set; }

#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public String currentPassword { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public String NewPassword { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public String ConfirmNewPassword { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.


    }
}
