using System.Collections.Generic;
using System.Web.Http;
//using MazeGeneratorLib;
//using MazeLib;
//using MazeServiceModel;
using MazeServiceModel.Model;
using Newtonsoft.Json;
using MazeGeneratorLib;
using MazeLib;
using Newtonsoft.Json.Linq;

namespace ex3.Controllers
{
    public class SinglePlayerController : ApiController
    {
        static private IModel mazeModel = new MyModel();
        //public IModel MazeModel { get => mazeModel; set => mazeModel = value; }

        // GET: api/SinglePlayer
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/SinglePlayer/5
        [Route("api/SinglePlayer/{name}/{algorithm}/")]
        [HttpGet]
        public JObject Solve(string name, int algorithm)
        {
            string solutionJson = mazeModel.Solve(name, algorithm);
            JObject mazeObj = JObject.Parse(solutionJson);
            return mazeObj;
        }

        // POST: api/SinglePlayer
        [Route("api/SinglePlayer/{name}/{rows}/{cols}")]
        //[Route("api/SinglePlayer/GenerataMazePost")]
        [HttpPost]
        public JObject GenerataMazePost(string name, int rows, int cols)
        {
            string mazeJson = mazeModel.GenerateMaze(name, rows, cols);
            JObject mazeObj = JObject.Parse(mazeJson);
            return mazeObj;            
        }

        // PUT: api/SinglePlayer/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/SinglePlayer/5
        public void Delete(int id)
        {
        }
    }
}
