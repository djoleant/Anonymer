namespace Models
{
    public class Post
    {
        public string ID { get; set; }
        public string AuthorID { get; set; }
        public string CategoryID { get; set; }
        public string Text { get; set; }
        public DateTime Time { get; set; }
        public int Upvotes { get; set; }
        public int Downvotes { get; set; }
    }
}