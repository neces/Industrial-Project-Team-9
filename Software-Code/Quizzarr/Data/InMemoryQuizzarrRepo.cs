using System.Collections.Generic;
using Quizzarr.Models;

namespace Quizzarr.Data
{
    public class InMemoryQuizzarrRepo : IQuizzarrRepo
    {

        public GameSession GetSessionById(string id)
        {
            //List<User> = new List<>

            List<GameSession> games = new List<GameSession>
            {
                new GameSession
                {
                    SessionId="1",
                    Users = new List<User>{
                        new User {Id="1", DisplayName="Bob"},
                        new User {Id="1", DisplayName="Jan"},
                        new User {Id="1", DisplayName="Joe"}
                    }
                }
            };

            for (long i = 1; i < 999999999; i++){}

            foreach (GameSession session in games)
            {
                if (session.SessionId.Equals(id)){
                    return session;
                }
            }

            return null;
        }
    }
}