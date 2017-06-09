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
        private IModel mazeModel = new MyModel();
        //public IModel MazeModel { get => mazeModel; set => mazeModel = value; }

        // GET: api/SinglePlayer
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/SinglePlayer/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/SinglePlayer
        [Route("api/SinglePlayer/{name}/{rows}/{cols}")]
        [HttpPost]
        public JObject GenerataMaze(string name, int rows, int cols)
        {
            string MazeJson = mazeModel.GenerateMaze(name, rows, cols);
            JObject mazeObj = JObject.Parse(MazeJson);
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
