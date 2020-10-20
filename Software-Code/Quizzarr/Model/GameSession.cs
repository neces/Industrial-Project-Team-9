using System.Collections.Generic;

namespace Quizzarr.Models
{
    public class GameSession
    {
        public string SessionId { get; set; }
        public string QuizName { get; set; }
        public string HostID { get; set; }
        public List<User> Users { get; set; }
        public List<Question> Questions { get; set; }

        public int currentQuestion { get; set; }
        public bool gameInProgress { get; set; }

        public int NumberOfRounds { get; set; }
        public int NumberOfQuestionsPerRound {get; set;}
        public int NumberOfQuestion { get { return NumberOfRounds * NumberOfQuestionsPerRound; } }
        public int TimeBetweenRounds { get; set; }
        public int TimePerQuestion { get; set; }
        
    }}