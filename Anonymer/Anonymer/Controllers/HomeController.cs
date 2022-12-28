using Microsoft.AspNetCore.Mvc;
using ServiceStack.Redis;
using Models;
using System.Text.Json;
using System.ComponentModel.Design;

namespace Anonymer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        readonly RedisClient redis = new("redis://default:redispw@localhost:49153");
        public HomeController()
        {
            if (redis.Get<object>("next:post:id") == null)
                redis.Set("next:post:id", 1);
            if (redis.Get<object>("next:person:id") == null)
                redis.Set("next:person:id", 1);
            if (redis.Get<object>("next:chat:id") == null)
                redis.Set("next:chat:id", 1);
            if (redis.Get<object>("next:category:id") == null)
                redis.Set("next:category:id", 1);
            if (redis.Get<object>("next:comment:id") == null)
                redis.Set("next:comment:id", 1);
        }

        private string GetNextPostID()
        {
            long nextCounterKey = redis.Incr("next:post:id");
            return nextCounterKey.ToString("x");
        }

        private string GetNextPersonID()
        {
            long nextCounterKey = redis.Incr("next:person:id");
            return nextCounterKey.ToString("x");
        }

        private string GetNextChatID()
        {
            long nextCounterKey = redis.Incr("next:chat:id");
            return nextCounterKey.ToString("x");
        }

        private string GetNextCategoryID()
        {
            long nextCounterKey = redis.Incr("next:category:id");
            return nextCounterKey.ToString("x");
        }

        private string GetNextCommentID()
        {
            long nextCounterKey = redis.Incr("next:comment:id");
            return nextCounterKey.ToString("x");
        }

        [HttpPost]
        [Route("CreateCategory/{name}")]
        public IActionResult CreateCategory(string name)
        {
            string id = GetNextCategoryID();
            redis.Set("category:" + id + ":name", name);
            redis.PushItemToList("categories:all", id);
            return Ok(new { id });
        }

        [HttpPost]
        [Route("CreatePost/{text}/{authorID}/{categoryID}")]
        public IActionResult CreatePost(string text, string authorID, string categoryID)
        {
            string id = GetNextPostID();
            var post = new Post
            {
                ID = id,
                Text = text,
                Time = DateTime.Now,
                AuthorID = authorID,
                Upvotes = 0,
                Downvotes = 0,
                CategoryID = categoryID
            };
            redis.PushItemToList("category:" + categoryID + ":posts", id);
            redis.AddItemToSortedSet("category:" + categoryID + ":postssorted", id, 0);
            redis.PushItemToList("person:" + authorID + ":posts", id);
            redis.Set("post:" + id + ":post", post);
            return Ok(new { post });
        }

        [HttpPost]
        [Route("AddComment/{text}/{authorID}/{postID}")]
        public IActionResult AddComment(string text, string authorID, string postID)
        {
            string id = GetNextCommentID();
            var comment = new Comment
            {
                ID = id,
                PostID = postID,
                AuthorID = authorID,
                Text = text,
                Time = DateTime.Now,
                Upvotes = 0,
                Downvotes = 0
            };
            redis.PushItemToList("post:" + postID + ":comments", id);
            redis.Set("comment:" + id + ":comment", comment);
            return Ok(new { comment });
        }

        [HttpPost]
        [Route("CreateUser/{username}")]
        public IActionResult CreateUser(string username)
        {
            string id = GetNextPersonID();
            redis.Set("person:" + id + ":username", username);
            return Ok(new { id });
        }

        [HttpPut]
        [Route("Upvote/{postID}/{userID}")]
        public IActionResult Upvote(string postID, string userID)
        {
            if(redis.SetContainsItem("post:" + postID + ":upvotes",userID))
                return BadRequest();
            var result = redis.Get<Post>("post:" + postID + ":post");
            result.Upvotes++;
            redis.Set("post:" + postID + ":post", result);
            redis.AddItemToSet("post:" + postID + ":upvotes", userID);
            redis.RemoveItemFromSortedSet("category:" + result.CategoryID + ":postssorted", postID);
            redis.AddItemToSortedSet("category:" + result.CategoryID + ":postssorted", postID, result.Upvotes - result.Downvotes);
            return Ok();
        }

        [HttpPut]
        [Route("Downvote/{postID}/{userID}")]
        public IActionResult Downvote(string postID, string userID)
        {
            if(redis.SetContainsItem("post:" + postID + ":downvotes",userID))
                return BadRequest();
            var result = redis.Get<Post>("post:" + postID + ":post");
            result.Downvotes++;
            redis.Set("post:" + postID + ":post", result);
            redis.AddItemToSet("post:" + postID + ":downvotes", userID);
            redis.RemoveItemFromSortedSet("category:" + result.CategoryID + ":postssorted", postID);
            redis.AddItemToSortedSet("category:" + result.CategoryID + ":postssorted", postID, result.Upvotes - result.Downvotes);
            return Ok();
        }

        [HttpGet]
        [Route("GetPost/{postID}")]
        public IActionResult GetPost(string postID)
        {
            var post = redis.Get<Post>("post:" + postID + ":post");
            var upvotes = redis.GetAllItemsFromSet("post:" + postID + ":upvotes");
            var downvotes = redis.GetAllItemsFromSet("post:" + postID + ":downvotes");
            return Ok(new { post, upvotes, downvotes });
        }

        [HttpGet]
        [Route("GetPersonInfo/{personID}")]
        public IActionResult GetPersonUsername(string personID)
        {
            var username = redis.Get<string>("person:" + personID + ":username");

            return Ok(new { username });
        }

        [HttpGet]
        [Route("HasUserVoted/{userID}/{postID}")]
        public IActionResult HasUserVoted(string userID, string postID)
        {
            return Ok(new
            {
                upvoted = redis.SetContainsItem("post:" + postID + ":upvotes", userID),
                downvoted = redis.SetContainsItem("post:" + postID + ":downvotes", userID)
            });
        }

        [HttpGet]
        [Route("GetUsername/{userID}")]
        public IActionResult GetUsername(string userID)
        {

            return Ok(new { username = redis.Get<string>("person:" + userID + ":username") });
        }

        [HttpGet]
        [Route("GetComments/{postID}")]
        public IActionResult GetComments(string postID)
        {
            var result = redis.GetAllItemsFromList("post:" + postID + ":comments");
            var comments = new List<Comment>();
            foreach (var id in result)
            {
                var comment = redis.Get<Comment>("comment:" + id + ":comment");
                comments.Add(comment);
            }
            return Ok(new { comments });
        }

        [HttpGet]
        [Route("GetUpvotes/{postID}")]
        public IActionResult GetUpvotes(string postID)
        {
            var upvotes = redis.GetAllItemsFromSet("post:" + postID + ":upvotes");
            var users = new List<Person>();
            foreach (var id in upvotes)
            {
                var user = redis.Get<string>("person:" + id + ":username");
                users.Add(new Person { ID = id, Username = user });
            }
            return Ok(new { users });
        }

        [HttpGet]
        [Route("GetDownvotes/{postID}")]
        public IActionResult GetDownvotes(string postID)
        {
            var downvotes = redis.GetAllItemsFromSet("post:" + postID + ":downvotes");
            var users = new List<Person>();
            foreach (var id in downvotes)
            {
                var user = redis.Get<string>("person:" + id + ":username");
                users.Add(new Person { ID = id, Username = user });
            }
            return Ok(new { users });
        }

        [HttpGet]
        [Route("GetCategoryPosts/{categoryID}")]
        public IActionResult GetCategoryPosts(string categoryID)
        {
            var postIDs = redis.GetAllItemsFromList("category:" + categoryID + ":posts");
            var posts = new List<Post>();
            foreach (var id in postIDs)
            {
                var post = redis.Get<Post>("post:" + id + ":post");
                posts.Add(post);
            }
            return Ok(new { posts });
        }

        [HttpGet]
        [Route("GetCategoryPostsSorted/{categoryID}")]
        public IActionResult GetCategoryPostsSorted(string categoryID)
        {
            var postIDs = redis.GetAllItemsFromSortedSetDesc("category:" + categoryID + ":postssorted");
            var posts = new List<Post>();
            foreach (var id in postIDs)
            {
                var post = redis.Get<Post>("post:" + id + ":post");
                posts.Add(post);
            }
            return Ok(new { posts });
        }

        [HttpDelete]
        [Route("DeletePost/{postID}")]
        public IActionResult DeletePost(string postID)
        {
            var post = redis.Get<Post>("post:" + postID + ":post");
            redis.RemoveItemFromList("category:" + post.CategoryID + ":posts", postID);
            redis.Remove("post:" + postID + ":post");
            redis.Remove("post:" + postID + ":upvotes");
            redis.Remove("post:" + postID + ":downvotes");
            redis.RemoveItemFromList("person:" + post.AuthorID + ":posts", postID);


            foreach (var id in redis.GetAllItemsFromList("post:" + postID + ":comments"))
            {
                redis.Remove("comment:" + id + ":comment");
                redis.Remove("comment:" + id + ":upvotes");
                redis.Remove("comment:" + id + ":downvotes");
            }

            redis.Remove("post:" + postID + ":comments");

            return Ok();
        }

        [HttpDelete]
        [Route("DeleteComment/{commentID}")]
        public IActionResult DeleteComment(string commentID)
        {
            var comment = redis.Get<Comment>("comment:" + commentID + ":comment");
            redis.RemoveItemFromList("post:" + comment.PostID + ":comments", commentID);
            redis.Remove("comment:" + commentID + ":comment");
            redis.Remove("comment:" + commentID + ":upvotes");
            redis.Remove("comment:" + commentID + ":downvotes");
            return Ok();
        }

        [HttpGet]
        [Route("GetCategories")]
        public IActionResult GetCategories()
        {
            var resultList = redis.GetAllItemsFromList("categories:all");
            List<Category> categories = new List<Category>();
            foreach (var id in resultList)
            {
                var result = redis.Get<string>("category:" + id + ":name");
                categories.Add(new Category { ID = id, Name = result });
            }
            return Ok(new { categories });
        }

        [HttpPut]
        [Route("UpvoteComment/{commentID}/{userID}")]
        public IActionResult UpvoteComment(string commentID, string userID)
        {
            if(redis.SetContainsItem("comment:" + commentID + ":upvotes",userID))
                return BadRequest();
            var result = redis.Get<Comment>("comment:" + commentID + ":comment");
            result.Upvotes++;
            redis.Set("comment:" + commentID + ":comment", result);
            redis.AddItemToSet("comment:" + commentID + ":upvotes", userID);
            return Ok();
        }

        [HttpPut]
        [Route("DownvoteComment/{commentID}/{userID}")]
        public IActionResult DownvoteComment(string commentID, string userID)
        {
            if(redis.SetContainsItem("comment:" + commentID + ":downvotes",userID))
                return BadRequest();
            var result = redis.Get<Comment>("comment:" + commentID + ":comment");
            result.Downvotes++;
            redis.Set("comment:" + commentID + ":comment", result);
            redis.AddItemToSet("comment:" + commentID + ":downvotes", userID);
            return Ok();
        }

        [HttpGet]
        [Route("GetCommentUpvotes/{commentID}")]
        public IActionResult GetCommentUpvotes(string commentID)
        {
            var upvotes = redis.GetAllItemsFromSet("comment:" + commentID + ":upvotes");
            var users = new List<Person>();
            foreach (var id in upvotes)
            {
                var user = redis.Get<string>("person:" + id + ":username");
                users.Add(new Person { ID = id, Username = user });
            }
            return Ok(new { users });
        }

        [HttpGet]
        [Route("GetCommentDownvotes/{commentID}")]
        public IActionResult GetCommentDownvotes(string commentID)
        {
            var downvotes = redis.GetAllItemsFromSet("comment:" + commentID + ":downvotes");
            var users = new List<Person>();
            foreach (var id in downvotes)
            {
                var user = redis.Get<string>("person:" + id + ":username");
                users.Add(new Person { ID = id, Username = user });
            }
            return Ok(new { users });
        }

        [HttpPut]
        [Route("EditPost/{postID}/{text}")]
        public IActionResult EditPost(string postID, string text)
        {
            var post = redis.Get<Post>("post:" + postID + ":post");
            post.Text = text;
            post.Time = DateTime.Now;
            redis.Set("post:" + postID + ":post", post);

            return Ok(new { post });
        }

        [HttpPut]
        [Route("EditComment/{commentID}/{text}")]
        public IActionResult EditComment(string commentID, string text)
        {
            var comment = redis.Get<Comment>("comment:" + commentID + ":comment");
            comment.Text = text;
            comment.Time = DateTime.Now;
            redis.Set("comment:" + commentID + ":comment", comment);

            return Ok(new { comment });
        }

        [HttpGet]
        [Route("GetPersonPosts/{personID}")]
        public IActionResult GetPersonPosts(string personID)
        {
            var postIDs = redis.GetAllItemsFromList("person:" + personID + ":posts");
            var posts = new List<Post>();
            foreach (var id in postIDs)
            {
                var post = redis.Get<Post>("post:" + id + ":post");
                posts.Add(post);
            }
            return Ok(new { posts });
        }

        [HttpPost]
        [Route("SubijemUpis/{key}/{value}")]
        public async Task<IActionResult> SubijemUpis(string key, int value)
        {
            redis.Set(key, value);

            return Ok();
        }

        [HttpGet]
        [Route("SubijemCitanje/{key}")]
        public async Task<IActionResult> SubijemCitanje(string key)
        {
            var result = redis.Get<object>(key);
            return Ok(result);
        }

        [HttpDelete]
        [Route("ClearAll")]
        public async Task<IActionResult> ClearAll()
        {
            redis.FlushAll();
            redis.FlushDb();
            return Ok();
        }
    }
}
