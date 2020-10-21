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

        public double numCorrect { get; set; }

        public double numIncorrect { get; set; }

        public double difficulty { get; set; }

        public List<string> altAnswers { get; set; }
        
        public Question(int id, string type, string question, string answer, string topic, int multiChoiceID, double numCorrect, double numIncorrect, double difficulty, List<string> altAnswers)
        {
            this.id = id;
            this.type = type;
            this.question = question;
            this.answer = answer;
            this.topic = topic;
            this.multiChoice_ID = multiChoiceID;
            this.numCorrect = numCorrect;
            this.numIncorrect = numIncorrect;
            this.difficulty = difficulty;
            this.altAnswers = altAnswers;
        }
    }
}