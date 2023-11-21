using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PulseConnect.Models
{
    [Table("ConnectionLog")]
    public class ConnectionLog
    {
        /*Schema:
         * - id_log : string [PK]
         * - id_connection : string [FK]
         * - action_date : datetime
         * - description : string
         */

        [Key]
        [Column("id_log")]
        [Required]
        public String ID_Log { get; set; }

        [Column("id_connection")]
        [Required]
        //[ForeignKey("ID_Connection")]
        public String ID_Connection { get; set; }

        [Column("action_date")]
        [Required]
        public DateTime Action_Date { get; set; }

        [Column("description")]
        [Required]
        public String Description { get; set; }

    }
}
