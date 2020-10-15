namespace Quizzarr.Models {
    public class Leaderboard {

        public string displayName { get; set; }
        public int score { get; set; }
        public int highestStreak { get; set; }


        public Leaderboard(string displayName, int score, int highestStreak)
        {
            this.displayName = displayName;
            this.score = score;
            this.highestStreak = highestStreak;
        }
    }
}