using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PulseConnect.Models
{
    [Table("ThirdPartyAccount")]
    public class ThirdPartyAccount
    {
        [Key, Column("id"), Required]
        public int ThirdPartyAccountId { get; set; }

        [Column("UserId"), Required]
        public string UserId { get; set; }

        [Column("AccountId"), Required]
        public string AccountType { get; set; }
    }
}
