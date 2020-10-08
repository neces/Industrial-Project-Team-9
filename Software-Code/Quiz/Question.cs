using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quiz
{
    class Question
    {
        public string MainQuestion { get; set; }
        public List<String> Answers { get; set; }
        public List<String> CorrectAnswers { get; set; }
        public double Difficulty { get; set; }
        public string Category { get; set; }
        public int NumberOfAnswers { get; set; }
        public int NumberOfCorrectAnswers { get; set; }


        // Constructor
        public Question(string mainQuestion, List<String> answers, List<String> correctAnswers, double difficulty, string category, int numberOfAnswers, int numberOfCorrectAnswers) =>
            (MainQuestion, Answers, CorrectAnswers, Difficulty, Category, NumberOfAnswers, NumberOfCorrectAnswers) = 
            (mainQuestion, answers, correctAnswers, difficulty, category, numberOfAnswers, numberOfCorrectAnswers);

    }
}
