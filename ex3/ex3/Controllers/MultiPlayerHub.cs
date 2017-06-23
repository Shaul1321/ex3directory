using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json.Linq;
using System.Collections.Concurrent;

namespace ex3.Controllers
{
    /// <summary>
    /// this hub is responsible for the communication during a multiplayer game.
    /// </summary>
    public class MultiPlayerHub : Hub
    {

        /// <summary>
        /// a dictionary that maps players name to their id
        /// </summary>
        private static ConcurrentDictionary<string, string> connectedUsers =
new ConcurrentDictionary<string, string>();
        /// <summary>
        /// a dictionary that maps a maze name to a list of players in that maze
        /// </summary>
        private static ConcurrentDictionary<string, List<string>> mazeNameToPlayersMapping =
new ConcurrentDictionary<string, List<string>>();

        private static int numPlayers=0;

        public void Hello()
        {
            Clients.All.hello();
        }


        /// <summary>
        /// invoked by the client when starting a new game / joining an existing game
        /// updates the dictionaries accordingly.
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="mazeName"></param>
        public void Connect(string userName, string mazeName)
        {
            //if it's the first user on that maze, create a new list in the dic.
            if (!mazeNameToPlayersMapping.ContainsKey(mazeName))
            {
                mazeNameToPlayersMapping[mazeName] = new List<string>();                
            }
            //add the user to the dictionaries
            mazeNameToPlayersMapping[mazeName].Add(userName);
            connectedUsers[userName] = Context.ConnectionId;
            numPlayers++;
        }

        /// <summary>
        /// invoked by one player to notify his oponent about a move
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="mazeName"></param>
        /// <param name="direction"></param>
        public void notifyPlayerHasMoved(string userName, string mazeName, string direction)
        {

            string oponentName = getOponent(userName, mazeName);
            string recipientId = connectedUsers[oponentName];

            if (recipientId == null)
                return;
            Clients.Client(recipientId).oponentMoved(direction);
        }

        /// <summary>
        /// an helper function to get the oponent of a specific player
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="mazeName"></param>
        /// <returns></returns>
        private string getOponent(string userName, string mazeName)
        {
            List<string> players = mazeNameToPlayersMapping[mazeName];
            string oponentName;
            if (players.ElementAt(0).Equals(userName))
            {
                oponentName = players.ElementAt(1);
            }
            else
            {
                oponentName = players.ElementAt(0);
            }
            return oponentName;
        }

        /// <summary>
        /// invoked by the client after joining an existing game (to notify the creator of the game it has started)
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="mazeName"></param>
        /// <param name="serializedMaze"></param>
        public void notifyGameStarted(string userName, string mazeName, JObject serializedMaze)
        {

            List<string> players = mazeNameToPlayersMapping[mazeName];
            string oponentName = getOponent(userName, mazeName);
            string recipientId = connectedUsers[oponentName];
            if (recipientId == null)
                return;
            Clients.Client(recipientId).oponentJoined(serializedMaze);
        }        
    }
}