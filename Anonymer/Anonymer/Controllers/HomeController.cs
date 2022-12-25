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
        readonly RedisClient redis=new("redis://default:redispw@localhost:49153");
        public HomeController()
        {
            if(redis.Get<object>("next:post:id")==null)
                redis.Set("next:post:id", "1");
            if(redis.Get<object>("next:person:id")==null)
                redis.Set("next:person:id", "1");
            if(redis.Get<object>("next:chat:id")==null)
                redis.Set("next:chat:id", "1");
            if(redis.Get<object>("next:category:id")==null)
                redis.Set("next:category:id", "1");
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
            redis.Set("category:" + id + ":posts", name);
            return Ok(id);
        }

        [HttpPost]
        [Route("CreatePost/{text}/{authorID}/{categoryID}")]
        public IActionResult CreateCategory(string text,string authorID,string categoryID)
        {
            string id = GetNextPostID();
            var post = new Post
            {
                Text = text,
                Time = DateTime.Now,
                AuthorID = authorID,
                Upvotes = 0,
                Downvotes = 0,
                CategoryID = categoryID
            };
            redis.PushItemToList("category:" + categoryID + ":posts", id);
            redis.Set("post:" + id + ":post",  JsonSerializer.Serialize(post));
            return Ok(post);
        }

        [HttpPost]
        [Route("SubijemUpis/{nesto}")]
        public async Task<IActionResult> SubijemUpis(string nesto)
        {
            redis.Set("kljucic", nesto);
        
            return Ok();
        }

        [HttpGet]
        [Route("SubijemCitanje/{key}")]
        public async Task<IActionResult> SubijemCitanje(string key)
        {
            var result = redis.Get<string>(key);
            return Ok(result);
        }
    }
}
