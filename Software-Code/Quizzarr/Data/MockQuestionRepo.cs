using System.Collections.Generic;
using Quizzarr.Models;

namespace Quizzarr.Data
{
    public class MockQuestionRepo : IQuestionRepo
    {
        public List<Question> GetQuestionsSet()
        {
            List<Question> questions = new List<Question> {
                new Question { id=0, type="MultiChoice", question="What is my name?", answer="Topu", topic="Personal", multiChoice_ID=0, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{"Jordan", "Cammy", "Melvin"} },
                new Question { id=1, type="MultiChoice", question="What is my fav colour?", answer="Purple", topic="Personal", multiChoice_ID=1, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{"Green", "Blue", "Red"} },
                new Question { id=2, type="MultiChoice", question="What is my fav colour?", answer="Purple", topic="Personal", multiChoice_ID=1, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{"Green", "Blue", "Red"} },
                new Question { id=3, type="MultiChoice", question="What is my fav colour?", answer="Purple", topic="Personal", multiChoice_ID=1, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{"Green", "Blue", "Red"} },
                new Question { id=4, type="MultiChoice", question="What is my fav colour?", answer="Purple", topic="Personal", multiChoice_ID=1, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{"Green", "Blue", "Red"} },
                new Question { id=5, type="MultiChoice", question="What is my fav colour?", answer="Purple", topic="Personal", multiChoice_ID=1, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{"Green", "Blue", "Red"} },
                new Question { id=6, type="MultiChoice", question="What is my fav colour?", answer="Purple", topic="Personal", multiChoice_ID=1, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{"Green", "Blue", "Red"} },
                new Question { id=7, type="MultiChoice", question="What is my fav colour?", answer="Purple", topic="Personal", multiChoice_ID=1, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{"Green", "Blue", "Red"} },
                new Question { id=8, type="MultiChoice", question="What is my fav colour?", answer="Purple", topic="Personal", multiChoice_ID=1, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{"Green", "Blue", "Red"} }
            };
            
            return questions;
        }

        public List<string> GetQuestionThemes()
        {
            throw new System.NotImplementedException();
        }
    }
}