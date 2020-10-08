using System;
using System.Collections.Generic;
using System.Text;

namespace Quiz
{
    class Score
    {
        public int CurrentScore { get; private set; }

        public Score(int currentScore) => 
            CurrentScore = currentScore;

        


        public void updateScore(int update) => 
            CurrentScore += update;

        
    }
}
