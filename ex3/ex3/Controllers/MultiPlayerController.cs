using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MazeServiceModel.Model;
using Newtonsoft.Json.Linq;

/// <summary>
/// this class offers web api services for a multiplayer maze game
/// </summary>
namespace ex3.Controllers
{
    public class MultiPlayerController : ApiController
    {
        /// <summary>
        /// the mazemodel offers maze logic-related services
        /// </summary>
        static private IModel mazeModel = new MyModel();


        /// <summary>
        /// get a list of available multiplyaer games
        /// </summary>
        /// <returns>a serialized list of maze names</returns>
        // GET: api/MultiPlayer/list/5
        [Route("api/MultiPlayer/list")]
        [HttpGet]
        public String GetList()
        {
            String mazeListAsJson = mazeModel.List();
            return mazeListAsJson;
        }

        /// <summary>
        /// starts a new multiplayer game
        /// </summary>
        /// <param name="name"></param>
        /// <param name="rows"></param>
        /// <param name="cols"></param>
        [Route("api/MultiPlayer/start/{name}/{rows}/{cols}")]
        [HttpGet]
        public void StartGame(string name, int rows, int cols)
        {
            mazeModel.StartGame(name, rows, cols);
        }

        /// <summary>
        /// join an existing multiplayer game
        /// </summary>
        /// <param name="name">name of the game</param>
        /// <returns></returns>
        [Route("api/MultiPlayer/join/{name}")]
        [HttpGet]
        public JObject JoinGame(string name)
        {
            String answerJson = mazeModel.JoinToGame(name);
            JObject answer  = JObject.Parse(answerJson);
            return answer;
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
