using System.Collections.Generic;
using Quizzarr.Models;

namespace Quizzarr.Data
{
    public class MockQuestionRepo : IQuestionRepo
    {
        List<Question> questions = new List<Question> {
            new Question (0, "MultiChoice", "What is the rarest colour found in nature?", "Blue", "Personal", 0, 1, 10, (1/10), new List<string>{"Yellow", "Red", "Black"} ),
            new Question (1, "MultiChoice", "How many blue stripes are there on the American flag?", "0", "Personal", 1, 1, 10, (1/10), new List<string>{"6", "7", "13"} ),
            new Question (2, "TrueFalse", "Linux was first created as an alternative to Windows XP", "False", "Personal", 1, 1, 10, (1/10), new List<string>{} ),
            new Question (3, "MultiChoice", "Which of these cities was established first?", "Madrid", "Personal", 1, 1, 10, (1/10), new List<string>{"New York City", "Copenhagen", "Boston"} ),
            new Question (4, "TrueFalse", "In 2008, Usain Bolt set the world record for the 100 meters with one shoelace untied", "True", "Personal", 1, 1, 10, (1/10), new List<string>{} ),
            new Question (5, "TrueFalse", "Netflix began as a DVD rental service", "True", "Personal", 1, 1, 10, (1/10),  new List<string>{} ),
            new Question (6, "MultiChoice", "Which of these oceans has the greatest depth?", "Pacific Ocean", "Personal", 1, 1, 10, (1/10),  new List<string>{"Indian Ocean", "Atlantic Ocean", "Artic Ocean"} ),
            new Question (7, "MultiChoice", "Which of these pieces of clothing is worn on the head?", "Fez", "Personal", 1, 1, 10, (1/10), new List<string>{"Mitumba", "Koto", "Kiondo"} ),
            new Question (8, "TrueFalse", "Gouda and Edam are famous types of Dutch cheeses", "True", "Personal", 1, 1, 10, (1/10),  new List<string>{} )
        };

        public List<Question> GetQuestionsSet(int count)
        {
            if (count >= questions.Count) return questions;

            List<Question> output = new List<Question>();

            for (int i = 0; i < count; i++) {
                output.Add(questions[i]);
            }

            return output;
        }
    }
}