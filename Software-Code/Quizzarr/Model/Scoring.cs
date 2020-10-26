namespace Quizzarr.Models {
    public class Scoring {
        public int Score { get; private set; }
        
        public double streakMultiplier { get; private set; }
        public int streak { get; private set; }
        public int highestStreak { get; private set; }


        // Create a new object of scoring
        public Scoring()
        {
            Score = 0;
            streakMultiplier = 1;
            streak = 0;
            highestStreak = 0;
        }


        // Increases the score based on if the question was answered correctly
        public void UpdateScore(bool isCorrect) {
            if (isCorrect) {
                UpdateStreak();
                
                Score += (int)(1000 * streakMultiplier);
            } else {
                streakMultiplier = 1;
                streak = 0;
            }
        }


        // Increases the streak attirbutes as well as tracking the highest streak
        private void UpdateStreak() {
            streak++;
            streakMultiplier += 0.05;

            if (streak > highestStreak) 
                highestStreak = streak;
        }
    }
}