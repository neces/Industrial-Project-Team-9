using System.Collections.Generic;
using Quizzarr.Models;

namespace Quizzarr.Data
{
    public class MockQuestionRepo : IQuestionRepo
    {
        List<Question> questions = new List<Question> {
            new Question { id=0, type="MultiChoice", question="What is the rarest colour found in nature?", answer="Blue", topic="Personal", multiChoice_ID=0, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{"Yellow", "Red", "Black"} },
            new Question { id=1, type="MultiChoice", question="How many blue stripes are there on the American flag?", answer="0", topic="Personal", multiChoice_ID=1, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{"6", "7", "13"} },
            new Question { id=2, type="TrueFalse", question="Linux was first created as an alternative to Windows XP", answer="False", topic="Personal", multiChoice_ID=1, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{} },
            new Question { id=3, type="MultiChoice", question="Which of these cities was established first?", answer="Madrid", topic="Personal", multiChoice_ID=1, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{"New York City", "Copenhagen", "Boston"} },
            new Question { id=4, type="TrueFalse", question="In 2008, Usain Bolt set the world record for the 100 meters with one shoelace untied", answer="True", topic="Personal", multiChoice_ID=1, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{} },
            new Question { id=5, type="TrueFalse", question="Netflix began as a DVD rental service", answer="True", topic="Personal", multiChoice_ID=1, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{} },
            new Question { id=6, type="MultiChoice", question="Which of these oceans has the greatest depth?", answer="Pacific Ocean", topic="Personal", multiChoice_ID=1, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{"Indian Ocean", "Atlantic Ocean", "Artic Ocean"} },
            new Question { id=7, type="MultiChoice", question="Which of these pieces of clothing is worn on the head?", answer="Fez", topic="Personal", multiChoice_ID=1, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{"Mitumba", "Koto", "Kiondo"} },
            new Question { id=8, type="TrueFalse", question="Gouda and Edam are famous types of Dutch cheeses", answer="True", topic="Personal", multiChoice_ID=1, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{} }
        };

        public List<Question> GetQuestionsSet()
        {            
            return questions;
        }

        public List<Question> GetQuestionsSet(int count)
        {
            if (count >= questions.Count) return questions;

            List<Question> output = new List<Question>();

            for (int i = 0; i < count; i++) {
                output.Add(questions[i]);
            }

            return output;
        }

        public List<string> GetQuestionThemes()
        {
            throw new System.NotImplementedException();
        }
    }
}