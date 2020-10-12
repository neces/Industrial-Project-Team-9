using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace Quiz
{
    class Quiz
    {
        public string QuizID { get; private set; }
        public List<Player> Players { get; set; }
        public List<Question> Questions { get; private set; }

        // Constructor
        public Quiz(string quizID) => 
            (QuizID, Players, Questions) = (quizID, new List<Player>(), new List<Question>());




        public void createQuestion(List<List<String>> questionSet)
        {
            //questionSet = new List<String>();
            string mainQuestion;
            List<String> answers = new List<String>();
            List<String> correctAnswers = new List<String>();
            double difficulty;
            string category;
            int numberOfAnswers;
            int numberOfCorrectAnswers;

            for (int i = 0; i < questionSet.Count; i++)
            {
                int j = 0;

                mainQuestion = questionSet[i][j++];
                numberOfAnswers = Int32.Parse(questionSet[i][j++]);

                for (int x = 0; x < numberOfAnswers; x++)
                {
                    answers.Add(questionSet[i][j++]);
                }

                difficulty = Double.Parse(questionSet[i][j++]);
                category = questionSet[i][j++];
                numberOfCorrectAnswers = Int32.Parse(questionSet[i][j++]);

                Questions.Add(new Question(mainQuestion, answers, correctAnswers, difficulty, category, numberOfAnswers, numberOfCorrectAnswers));

                answers.Clear();
                correctAnswers.Clear();
            }


        }

        public void addPlayer(String id, String name, int score = 0)
        {
            Players.Add(new Player(id, name, new Score(score)));
        }

        public Boolean removePlayer(String id)
        {
            var playerToRemove = Players.SingleOrDefault(r => r.Id == id);
            return Players.Remove(playerToRemove);
        }


        public void start()
        {

        }

        public void end()
        {

        }

        
    }
}
