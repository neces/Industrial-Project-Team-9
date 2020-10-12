using System.Collections.Generic;
using Quizzarr.Models;

namespace Quizzarr.Data
{
    public class MockQuestionRepo : IQuestionRepo
    {
        public List<Question> GetQuestionsSet()
        {
            throw new System.NotImplementedException();
        }

        public List<string> GetQuestionThemes()
        {
            throw new System.NotImplementedException();
        }
    }
}