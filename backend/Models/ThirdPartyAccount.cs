using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PulseConnect.Models
{
    [Table("ThirdPartyAccount")]
    public class ThirdPartyAccount
    {
        [Key, Column("ThirdPartyAccountID"), Required]
        public int ThirdPartyAccountId { get; set; }

        [Column("UserID"), Required]
        public string UserId { get; set; }

        [Column("AccountType"), Required]
        public string AccountType { get; set; }
    }
}
