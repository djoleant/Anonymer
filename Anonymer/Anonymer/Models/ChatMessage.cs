namespace Models
{
    public class ChatMessage
    {
        public string SenderID { get; set; }
        public string RecipientID { get; set; }
        public string Text { get; set; }
        public DateTime Time { get; set; }
    }
}