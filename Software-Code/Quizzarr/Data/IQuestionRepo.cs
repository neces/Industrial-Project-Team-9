using System.Collections.Generic;
using Quizzarr.Models;

namespace Quizzarr.Data
{
    public interface IQuestionRepo
    {
        // Returns a list of questions
        List<Question> GetQuestionsSet(int count);
    }
}