using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PulseConnect.Models
{
    [Table("PasswordReset")]
    public class PasswordReset
    {
        [Key]
        [Column("id")]
        public String ID { get; set; }

        [ForeignKey("UserID")]
        public Users User { get; set; }

        [Column("user_id")]
        public String UserID { get; set; }

        [Column("Token")]
        public String Token { get; set; }

        [Column("Expire_Date")]
        public DateTime ExpireDate { get; set; }

        public String currentPassword { get; set; }

        public String NewPassword { get; set; }

        public String ConfirmNewPassword { get; set; }


    }
}
