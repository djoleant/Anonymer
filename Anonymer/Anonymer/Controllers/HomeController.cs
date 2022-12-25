using Microsoft.AspNetCore.Mvc;
using ServiceStack.Redis;

namespace Anonymer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        readonly RedisClient redis=new("redis://default:redispw@localhost:49153");
        public HomeController()
        {

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
