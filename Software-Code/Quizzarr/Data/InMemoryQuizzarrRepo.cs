using System.Collections.Generic;
using Quizzarr.Models;

namespace Quizzarr.Data
{
    public class InMemoryQuizzarrRepo : IQuizzarrRepo
    {
        //public List<GameSession> Games { get { return Games; } }

        List<GameSession> games = new List<GameSession>();

        public InMemoryQuizzarrRepo()
        {
            //System.Console.WriteLine("Created a new constructor");
            

            //System.Console.WriteLine("Count: " + games.Count);
        }

        public GameSession GetSessionById(string id)
        {
            foreach (GameSession session in games)
            {
                if (session.SessionId.Equals(id)){
                    return session;
                }
            }

            return null;
        }

        public User GetUserScore(int id)
        {
            throw new System.NotImplementedException();
        }

    }
}