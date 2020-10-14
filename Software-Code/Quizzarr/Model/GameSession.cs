using System.Collections.Generic;

namespace Quizzarr.Models
{
    public class GameSession
    {
        public string SessionId { get; set; }
        public string QuizCode { get; set; }
        public List<User> Users { get; set; }
        public List<Question> Questions { get; set; }

        public int currentQuestion { get; set; }
        public bool gameInProgress { get; set; }
    }
}