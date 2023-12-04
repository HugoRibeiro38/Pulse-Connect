using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

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
#pragma warning disable CS8618 // O campo n�o anul�vel precisa conter um valor n�o nulo ao sair do construtor. Considere declar�-lo como anul�vel.
        public String ID_User_1 { get; set; }
#pragma warning restore CS8618 // O campo n�o anul�vel precisa conter um valor n�o nulo ao sair do construtor. Considere declar�-lo como anul�vel.

        [Column("id_user_2")]
        [Required]
        //[ForeignKey("ID_User_2")]
#pragma warning disable CS8618 // O campo n�o anul�vel precisa conter um valor n�o nulo ao sair do construtor. Considere declar�-lo como anul�vel.
        public String ID_User_2 { get; set; }
#pragma warning restore CS8618 // O campo n�o anul�vel precisa conter um valor n�o nulo ao sair do construtor. Considere declar�-lo como anul�vel.

        [Column("connection_date")]
        [Required]
        public DateTime Connection_Date { get; set; }

        [Column("connection_status")]
        [Required]
        public ConnectionStatusEnum Connection_Status { get; set; }

    }

    public enum ConnectionStatusEnum
    {
        Imported,
        Pending,
        Accepted,
        Blocked
    }
}