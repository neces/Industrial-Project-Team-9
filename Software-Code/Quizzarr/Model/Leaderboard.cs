namespace Quizzarr.Models {
    public class Leaderboard {

        public string displayName { get; set; }
        public int score { get; set; }


        public Leaderboard(string displayName, int score)
        {
            this.displayName = displayName;
            this.score = score;
        }
    }
}