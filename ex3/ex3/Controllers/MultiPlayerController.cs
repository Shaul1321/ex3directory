using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MazeServiceModel.Model;
namespace ex3.Controllers
{
    public class MultiPlayerController : ApiController
    {
        static private IModel mazeModel = new MyModel();


        // GET: api/MultiPlayer/5
        [Route("api/MultiPlayer/list")]
        [HttpGet]
        public string GetList()
        {
            String listjson = mazeModel.List();
            return listjson;
        }

        [Route("api/MultiPlayer/start/{name}/{rows}/{cols}")]
        [HttpGet]
        public void StartGame(string name, int rows, int cols)
        {
            mazeModel.StartGame(name, rows, cols);
        }

        // POST: api/MultiPlayer
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/MultiPlayer/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/MultiPlayer/5
        public void Delete(int id)
        {
        }
    }
}
