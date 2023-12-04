using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace PulseConnect.Models
{
    [Table("Users")]
    public class Users : IdentityUser
    {
        [Key]
        [Column("id")]
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public String ID { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

        [Column("UserName")]
#pragma warning disable CS0114 // O membro oculta o membro herdado; palavra-chave substituta ausente
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public String UserName { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
#pragma warning restore CS0114 // O membro oculta o membro herdado; palavra-chave substituta ausente

        [Column("UserEmail")]
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public String UserEmail { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

        [Column("Password")]
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public String Password { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

        [Column("BIO")]
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public String BIO { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

        [Column("Date_Created")]
        public DateTime Date_Created { get; set; }

        [Column("Profile_Picture_URL")]
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public String Profile_Picture_URL { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

        [Column("Last_Active")]
        public DateTime Last_Active { get; set; }

        [Column("Gender")]
        public GenderEnum Gender { get; set; }

        [Column("Country")]
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public string Country { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

        [Column("Multi_FactorEnable")]
        public Boolean Multi_FactorEnable { get; set; }

        [Column("Multi_FactorCode")]
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public String Multi_FactorCode { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

        [Column("Multi_FactorExpired")]
        public DateTime Multi_FactorExpired { get; set; }

        [Column("Multi_FactorType")]
        public DefaultType Multi_FactorType { get; set; }

    }

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