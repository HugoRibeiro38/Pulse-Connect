using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace PulseConnect.Models
{
    [Table("Connections")]
    public class Connections
    {
        /*
         * Schema:
         * - id_connection : primary key
         * - id_user_1 : foreign key
         * - id_user_2 : foreign key
         * - connection date
         * - connection status (imported, pending, accepted, blocked)
         */

        [Key]
        [Column("id_connection")]
        [Required]
        public required String ID_Connection { get; set; }

        [Column("id_user_1")]
        [Required]
        //[ForeignKey("ID_User_1")]
        public String ID_User_1 { get; set; }

        [Column("id_user_2")]
        [Required]
        //[ForeignKey("ID_User_2")]
        public String ID_User_2 { get; set; }

        [Column("connection_date")]
        [Required]
        public DateTime Connection_Date { get; set; }

        [Column("connection_status")]
        [Required]
        public ConnectionStatusEnum Connection_Status { get; set; }

<<<<<<< HEAD
        public Users User1 { get; set; }
        public Users User2 { get; set; }
=======
        public Connections()
        {
            // Inicialize ID_Connection com algum valor único, por exemplo, uma GUID
            ID_Connection = Guid.NewGuid().ToString();
        }
>>>>>>> 47fdeff0e519e238bb4737fa2097eeb4863eb5b8

    }

    public enum ConnectionStatusEnum
    {
        Imported,
        Pending,
        Accepted,
        Blocked
    }
}