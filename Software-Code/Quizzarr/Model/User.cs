using System.Collections.Generic;

namespace Quizzarr.Models
{
    public class User
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public bool Answered { get; set; }
        public Scoring MyScore { get; set; }

        public User(string id, string displayName)
        {
            Id = id;
            DisplayName = displayName;
            Answered = false;
            MyScore = new Scoring();
        }
    }
}