using System.Collections.Generic;
using Quizzarr.Models;

namespace Quizzarr.Data
{
    public interface IQuizzarrRepo
    {
        GameSession GetSessionById(string id);
    }
}