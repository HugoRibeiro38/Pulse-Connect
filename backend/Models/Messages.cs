using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace PulseConnect.Models;

public class Messages
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public String ID { get; set; }

    [BsonElement("Sender_ID")]
    public String Sender_ID { get; set; }

    [BsonElement("Receiver_ID")]
    public String Receiver_ID { get; set; }

    [BsonElement("MessageContent")]
    public List<String> MessageContent { get; set; }

    [BsonElement("TimeStamp")]
    public DateTime TimeStamp { get; set; }

    [BsonElement("AttachmentUrls")]
    public List<String> AttachmentUrls { get; set; }

    [BsonElement("Status")]
    public List<EnumStatus> Status { get; set; }

}

public enum EnumStatus
{
    Send,
    Read,
    Failed
}