using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PulseConnect.Models
{
    /// <summary>
    /// Represents a user session in the application.
    /// </summary>
    [Table("Sessions")]
    public class Session
    {
        /// <summary>
        /// Gets or sets the unique identifier for the session.
        /// </summary>
        [Key]
        [Column("Session ID")]
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public string SessionID { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

        /// <summary>
        /// Gets or sets the user ID associated with the session.
        /// </summary>
        [Required (ErrorMessage ="User ID is required")]
        [Column("User ID")]
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public string UserID { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

        /// <summary>
        /// Gets or sets the reference to the user associated with the session.
        /// </summary>
        [ForeignKey("UserID")]
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public virtual Users User { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

        /// <summary>
        /// Gets or sets the start time of the session.
        /// </summary>
        [Required(ErrorMessage ="Session Start Time is required")]
        [Column("Session Start Time")]
        public DateTime SessionStartTime { get; set; }

        /// <summary>
        /// Gets or sets the end time of the session.
        /// </summary>
        [Column("Session End Time")]
        public DateTime? SessionEndTime { get; set; }//This is not required, as the session may still be active

        /// <summary>
        /// Gets or sets the session token associated with the session.
        /// </summary>
        [Column("Session Token")]
        [StringLength(100, ErrorMessage ="Session Token length can't exceed 100 characters")]
        [DataType(DataType.Text)] // Specify that the property represents plain text
        public string? SessionToken { get; set; }
    }
}
