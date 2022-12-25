namespace Models
{
    public class Comment
    {
        public string PostID { get; set; }
        public string AuthorID { get; set; }
        public string Text { get; set; }
        public DateTime Time { get; set; }
        public int Upvotes { get; set; }
        public int Downvotes { get; set; }
    }
}