using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json.Linq;
using System.Collections.Concurrent;

namespace ex3.Controllers
{
    public class MultiPlayerHub : Hub
    {

        private static ConcurrentDictionary<string, string> connectedUsers =
new ConcurrentDictionary<string, string>();
        private static ConcurrentDictionary<string, string> oponentsMapping =
new ConcurrentDictionary<string, string>();
        private static ConcurrentDictionary<string, List<string>> mazeNameToPlayersMapping =
new ConcurrentDictionary<string, List<string>>();

        private static int numPlayers=0;

        public void Hello()
        {
            Clients.All.hello();
        }



        public void Connect(string userName, string mazeName)
        {
            if (!mazeNameToPlayersMapping.ContainsKey(mazeName))
            {
                mazeNameToPlayersMapping[mazeName] = new List<string>();                
            }
            mazeNameToPlayersMapping[mazeName].Add(userName);
            connectedUsers[userName] = Context.ConnectionId;
            numPlayers++;
        }

        public void notifyPlayerHasMoved(string userName, string mazeName, string direction)
        {

            string oponentName = getOponent(userName, mazeName);
            string recipientId = connectedUsers[oponentName];

            if (recipientId == null)
                return;
            Clients.Client(recipientId).oponentMoved(direction);
        }

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