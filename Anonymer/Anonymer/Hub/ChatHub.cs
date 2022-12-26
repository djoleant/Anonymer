using Microsoft.AspNetCore.SignalR;
using ServiceStack.Redis;
using Models;
using System.Text.Json;
using ServiceStack.Logging;
using ServiceStack.Messaging;
using System.Xml.Linq;

namespace Hubs
{
    public class ChatHub : Hub
    {
        private readonly static Dictionary<string,string> connections = new Dictionary<string, string>();

        readonly RedisClient redis = new("redis://default:redispw@localhost:49153");

        IRedisSubscription subscription;
        public ChatHub()
        {
            subscription = redis.CreateSubscription();
            subscription.OnMessage = (channel, msg) =>
            {
                var chatMessage = JsonSerializer.Deserialize<ChatMessage>(msg);
                Clients.Client(connections[chatMessage.RecipientID]).SendAsync("RecieveMessage", chatMessage);
            };
            new Thread(delegate () {
                subscription.SubscribeToChannels("chat");
            }).Start();
        }

        // Send a message
        public async Task SendMessage(string senderID,string recipientID,string text)
        {
            var message = new ChatMessage
            {
                SenderID = senderID,
                RecipientID = recipientID,
                Text = text,
                Time = DateTime.Now
            };
            // Serialize message data
            var messageData = JsonSerializer.Serialize(message);

            // Publish message to Redis channel
            redis.PublishMessage("chat", messageData);
        }

        public void Subscribe(string userID)
        {
            connections[userID] = Context.ConnectionId;
        }

        public void Unsubscribe(string userID)
        {
            connections.Remove(userID);
        }

    }
}