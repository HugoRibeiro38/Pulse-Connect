using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace PulseConnect.Models
{
#pragma warning disable CS8618
    [Table("Users")]
    public class Users : IdentityUser
    {

        // 

        [Key]
        [Column("id")]
        [Required]
        public String ID { get; set; }

        [Column("UserName")]
        [Required(ErrorMessage = "O campo username é obrigatório")]
        #pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
#pragma warning disable CS0114 // O membro oculta o membro herdado; palavra-chave substituta ausente
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public String UserName { get; set; }

        [Column("UserEmail")]
        [Required(ErrorMessage = "O campo useremail é obrigatório")]

        public String UserEmail { get; set; }


        [Column("Password")]
        [Required(ErrorMessage = "O campo password é obrigatório")]

        public String Password { get; set; }


        [Column("BIO")]
        public String BIO { get; set; }

        [Column("Date_Created")]
        public DateTime Date_Created { get; set; }

        [Column("Profile_Picture_URL")]

        public String Profile_Picture_URL { get; set; }


        [Column("Last_Active")]
        public DateTime Last_Active { get; set; }

        [Column("Gender")]
        public GenderEnum Gender { get; set; }

        [Column("Country")]

        public string Country { get; set; }


        [Column("Multi_FactorEnable")]
        public Boolean Multi_FactorEnable { get; set; }

        [Column("Multi_FactorCode")]
        public String Multi_FactorCode { get; set; }

        [Column("Multi_FactorExpired")]
        public DateTime Multi_FactorExpired { get; set; }

        [Column("Multi_FactorType")]
        public DefaultType Multi_FactorType { get; set; }

        [Column("IsOnline")]
        public bool IsOnline { get; set; } = false;

        [Column("IsAccountActive")]
        public bool IsAccountActive { get; set; } = true;

    }

#pragma warning restore CS8618

    public enum GenderEnum
    {
        Male,
        Female
    }

    public enum DefaultType
    {
        PhoneNumber,
        Email
    }
}