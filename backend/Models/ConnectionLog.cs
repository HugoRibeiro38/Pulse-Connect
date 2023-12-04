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
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public String ID_Log { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

        [Column("id_connection")]
        [Required]
        //[ForeignKey("ID_Connection")]
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public String ID_Connection { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

        [Column("action_date")]
        [Required]
        public DateTime Action_Date { get; set; }

        [Column("description")]
        [Required]
#pragma warning disable CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.
        public String Description { get; set; }
#pragma warning restore CS8618 // O campo não anulável precisa conter um valor não nulo ao sair do construtor. Considere declará-lo como anulável.

    }
}
