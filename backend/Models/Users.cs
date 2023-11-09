using System.ComponentModel.DataAnnotations.Schema;

namespace PulseConnect.Models
{
    [Table("Users")]
    public class Users
    {
        [Column("id")]
        public String ID { get; set; }

        [Column("UserName")]
        public String UserName { get; set; }

        [Column("UserEmail")]
        public String UserEmail { get; set; }

        [Column("Password")]
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