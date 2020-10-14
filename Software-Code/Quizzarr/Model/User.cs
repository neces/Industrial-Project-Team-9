using System.Collections.Generic;

namespace Quizzarr.Models
{
    public class User
    {
        public User(string id, string displayName)
        {
            Id = id;
            DisplayName = displayName;
            Answered = false;
            Score = 0;
        }
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public bool Answered { get; set; }
        public int Score { get; set; }

    }
}