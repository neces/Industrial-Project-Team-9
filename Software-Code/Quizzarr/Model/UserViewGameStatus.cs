namespace Quizzarr.Models 
{
    public class UserViewGameStatus
    {
        public string SessionId { get; set; }
        public string QuizCode { get; set; }
        public int currentQuestion { get; set; }
        public bool gameInProgress { get; set; }

    }
}