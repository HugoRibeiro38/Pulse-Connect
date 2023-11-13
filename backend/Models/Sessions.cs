using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PulseConnect.Models
{
    [Table("Sessions")]
    public class Sessions
    {
        [Key]
        public string SessionID { get; set; }

        [Required]
        public string UserID { get; set; }

        [ForeignKey("User")]
        public virtual Users User { get; set; }

        [Required]
        public DateTime SessionStartTime { get; set; }
        public DateTime? SessionEndTime; //This is not required, as the session may still be active

        [Required]
        public required string? SessionToken;
    }
}
