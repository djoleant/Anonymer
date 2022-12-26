using Microsoft.AspNetCore.Mvc;
using ServiceStack.Redis;
using Models;
using System.Text.Json;

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

        [HttpPost]
        [Route("CreateCategory/{name}")]
        public IActionResult CreateCategory(string name)
        {
            string id = GetNextCategoryID();
            redis.Set("category:" + id + ":name", name);
            redis.PushItemToList("categories:all", id);
            return Ok(id);
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
            redis.Set("post:" + id + ":post", post);
            return Ok(post);
        }

        [HttpPost]
        [Route("CreateUser/{username}")]
        public IActionResult CreateUser(string username)
        {
            string id = GetNextPersonID();
            redis.Set("person:" + id + ":username", username);
            return Ok(id);
        }

        [HttpPut]
        [Route("Upvote/{postID}/{userID}")]
        public IActionResult Upvote(string postID, string userID)
        {
            var result = redis.Get<Post>("post:" + postID + ":post");
            result.Upvotes++;
            redis.Set("post:" + postID + ":post", result);
            redis.PushItemToList("post:" + postID + ":upvotes", userID);
            return Ok();
        }

        [HttpPut]
        [Route("Downvote/{postID}/{userID}")]
        public IActionResult Downvote(string postID, string userID)
        {
            var result = redis.Get<Post>("post:" + postID + ":post");
            result.Downvotes++;
            redis.Set("post:" + postID + ":post", result);
            redis.PushItemToList("post:" + postID + ":downvotes", userID);
            return Ok();
        }

        [HttpGet]
        [Route("GetPost/{postID}")]
        public IActionResult GetPost(string postID)
        {
            var post = redis.Get<Post>("post:" + postID + ":post");
            var upvotes = redis.GetAllItemsFromList("post:" + postID + ":upvotes");
            var downvotes = redis.GetAllItemsFromList("post:" + postID + ":downvotes");
            return Ok(new { post, upvotes, downvotes });
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
            return Ok(categories);
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
            var result = redis.Get<string>(key);
            return Ok(result);
        }

        [HttpDelete]
        [Route("Brisem")]
        public async Task<IActionResult> Brisem()
        {
            redis.FlushAll();
            redis.FlushDb();
            return Ok();
        }
    }
}
