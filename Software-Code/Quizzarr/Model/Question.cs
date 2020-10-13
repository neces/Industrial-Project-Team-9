using System.Collections.Generic;

namespace Quizzarr.Models
{
    public class Question
    {
        public int id { get; set; }

        public string type { get; set; }

        public string question { get; set; }

        public string answer { get; set; }

        public string topic { get; set; }

        public int multiChoice_ID { get; set; }

        public int numCorrect { get; set; }

        public int numIncorrect { get; set; }

        public double difficulty { get; set; }

        public List<string> altAnswers { get; set; }
    }
}