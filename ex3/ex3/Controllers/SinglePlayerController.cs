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
    /// <summary>
    /// offers web abi services for a singleplayer maze game
    /// </summary>
    public class SinglePlayerController : ApiController
    {
        static private IModel mazeModel = new MyModel();
        //public IModel MazeModel { get => mazeModel; set => mazeModel = value; }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        /// <summary>
        /// solve a specific maze
        /// </summary>
        /// <param name="name"></param>
        /// <param name="algorithm"></param>
        /// <returns>the serialized solution string</returns>
        // GET: api/SinglePlayer/5
        [Route("api/SinglePlayer/{name}/{algorithm}/")]
        [HttpGet]
        public JObject Solve(string name, int algorithm)
        {
            string solutionJson = mazeModel.Solve(name, algorithm);
            JObject mazeObj = JObject.Parse(solutionJson);
            return mazeObj;
        }

        /// <summary>
        /// generates a new maze
        /// </summary>
        /// <param name="name"></param>
        /// <param name="rows"></param>
        /// <param name="cols"></param>
        /// <returns>a serialized maze object</returns>
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
