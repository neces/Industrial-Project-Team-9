using System.Collections.Generic;
using Quizzarr.Models;

namespace Quizzarr.Data
{
    public interface IQuestionRepo
    {
        
        List<Question> GetQuestionsSet(int count);
    }
}