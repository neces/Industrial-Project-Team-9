using System.Collections.Generic;
using Quizzarr.Models;

namespace Quizzarr.Data
{
    public interface IQuizzarrRepo
    {
        //private List<GameSession> games = new List<GameSession>();

        List<GameSession> Games { get; }

        GameSession GetSessionById(string id);

        User GetUserScore(int id);
    }
}