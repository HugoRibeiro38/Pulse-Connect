namespace PulseConnect.Models;


public class Messages
{
    public String ID { get; set; }
    public String Sender_ID { get; set; }

    public String Receiver_ID { get; set; }

    public List<String> MessageContent { get; set; }
    public DateTime TimeStamp { get; set; }

    public List<String> AttachmentUrls { get; set; }

    public List<EnumStatus> Status { get; set; }

}

public enum EnumStatus
{
    Send,
    Read,
    Failed
}