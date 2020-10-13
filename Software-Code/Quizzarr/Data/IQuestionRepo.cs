using System.Collections.Generic;
using Quizzarr.Models;

namespace Quizzarr.Data
{
    public interface IQuestionRepo
    {
        List<string> GetQuestionThemes();
        Question GetQuestionsSet(int index);
    }
}