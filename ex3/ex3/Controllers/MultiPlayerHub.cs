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
        private static string player1;
        private static string player2;
        private static int numPlayers=0;

        public void Hello()
        {
            Clients.All.hello();
        }



        public void Connect(string name)
        {
            connectedUsers[name] = Context.ConnectionId;
            numPlayers++;
            if (numPlayers == 1)
            {
                player1 = name;
            }
            else
            {
                player2 = name;
                oponentsMapping[player1] = player2;
                oponentsMapping[player2] = player1;
            }

        }

        public void notifyPlayerHasMoved(string name, string direction)
        {

            string oponentName = oponentsMapping[name];
            string recipientId = connectedUsers[oponentName];
            var myname = name;

            if (recipientId == null)
                return;
            Clients.Client(recipientId).oponentMoved(direction);
        }

        public void notifyGameStarted(string name, JObject serializedMaze)
        {
            Console.WriteLine("GAME HAS BEEN STARTED");
            string oponentName = oponentsMapping[name];
            string recipientId = connectedUsers[oponentName];
            if (recipientId == null)
                return;
            var namename = oponentName;
            var oponent = oponentsMapping[name];
            var id = recipientId;
            Clients.Client(recipientId).oponentJoined(serializedMaze);
        }
        
    }
}