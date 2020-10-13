using System.Collections.Generic;
using Quizzarr.Models;

namespace Quizzarr.Data
{
    public class InMemoryQuizzarrRepo : IQuizzarrRepo
    {
        public List<GameSession> Games { get { return Games; } }

        //games = new List<GameSession>();

        public InMemoryQuizzarrRepo()
        {
            System.Console.WriteLine("Created a new constructor");
            Games.Add(
                new GameSession
                {
                    SessionId="session01",
                    Users = new List<User>{
                        new User {Id="1", DisplayName="Bob"},
                        new User {Id="2", DisplayName="Jan"},
                        new User {Id="3", DisplayName="Joe"}
                    },
                    Questions = new List<Question>(),
                    currentQuestion = 0
                }
            );

            Games.Add(
                new GameSession
                {
                    SessionId="session02",
                    Users = new List<User>{
                        new User {Id="4", DisplayName="Topu"},
                        new User {Id="5", DisplayName="Cammy"},
                        new User {Id="6", DisplayName="Jordan"},
                        new User {Id="7", DisplayName="Melvin"}
                    },
                    Questions = new List<Question>(),
                    currentQuestion = 0
                }
            );

            System.Console.WriteLine("Count: " + Games.Count);
        }

        public GameSession GetSessionById(string id)
        {
            foreach (GameSession session in Games)
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