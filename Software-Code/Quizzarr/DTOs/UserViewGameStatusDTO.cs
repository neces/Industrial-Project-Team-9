namespace Quizzarr.DTOs 
{
    public class UserViewGameStatusDTO
    {
        public string SessionId { get; set; }
        public string QuizName { get; set; }
        public int NumberOfUsers { get; set; }

        public bool gameInProgress { get; set; }

        public int NumberOfQuestions { get; set; }
        public int currentQuestion { get; set; }
        
        public int NumberOfRounds { get; set; }
        public int NumberOfQuestionsPerRound { get; set; }
        public int TimeBetweenRounds { get; set; }
        public int TimePerQuestion { get; set; }

    }
}