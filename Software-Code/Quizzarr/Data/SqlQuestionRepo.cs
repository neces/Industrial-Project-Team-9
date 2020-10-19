using System.Collections.Generic;
using Quizzarr.Models;
using System;
using System.Data;
using Microsoft.Data.SqlClient;

namespace Quizzarr.Data
{
    public class SqlQuestionRepo : IQuestionRepo
    {
        const string _DBName = "QuestionBD";
        const string _QuestionBank = "QuestionsTable";
        const string _MultiChoice = "MultiChoiceTable";

        string sConnectionString;
        SqlConnection objConn;

        public SqlQuestionRepo()
        {
            sConnectionString = "Server=tcp:mysqlserverteam9.database.windows.net,1433;" +
                                "Initial Catalog=QuestionDB;" +
                                "Persist Security Info=True;" +
                                "User ID=azureuser;" +
                                "Password=SQLteam9;" +
                                "MultipleActiveResultSets=False;" +
                                "Encrypt=True;TrustServerCertificate=True;" +
                                "Connection Timeout=30;";
            objConn = new SqlConnection(sConnectionString);
        }

        public List<Question> GetQuestionsSet()
        {
            throw new System.NotImplementedException();
        }

        public List<Question> GetQuestionsSet(int count)
        {
            List<Question> questions = new List<Question>();
            objConn.Open();

            SqlDataAdapter daQuestions = new SqlDataAdapter("Select * from QuestionsTable", objConn);

            DataSet dsQuestions = new DataSet(_DBName);

            daQuestions.Fill(dsQuestions, _QuestionBank);

            DataTable tblQuestions = dsQuestions.Tables[_QuestionBank];

            Console.WriteLine(tblQuestions.Rows.Count);

            foreach (DataRow dr in tblQuestions.Rows) {

                // Check type of qustion
                // create alt answers list
                // if question is multichoice
                //      populate list with alt answers
                // set altAnsers to list

                List<string> __altAnswers = new List<string>();
                if (dr["Type"].ToString().Equals("MultiChoice")) {
                    string query = "Select * from MultiChoiceTable where ID='" + dr["MultiChoice_ID"].ToString() + "'";
                    SqlDataAdapter daAnswers = new SqlDataAdapter(query, objConn);
                    DataSet dsAnswers = new DataSet(_DBName);
                    daAnswers.Fill(dsAnswers, _MultiChoice);
                    DataTable tblAnswers = dsAnswers.Tables[_MultiChoice];
                    
                    // FIX THIS BIT HERE PLEASE CAUSE WHOOPIES IT DOESNT WORK
                    if (tblAnswers.Rows[0]) {
                        DataRow drA = tblAnswers.Rows[0];
                        __altAnswers.Add(drA["AltAnswer01"].ToString());
                        __altAnswers.Add(drA["AltAnswer02"].ToString());
                        __altAnswers.Add(drA["AltAnswer03"].ToString());
                    }
                }

                int _id = int.Parse(dr["ID"].ToString());
                string _type = dr["Type"].ToString();
                string _question = dr["Question"].ToString();
                string _answer = dr["Answer"].ToString();
                string _topic = dr["Topic"].ToString();
                int _multiChoice_ID = (dr["MultiChoice_ID"].Equals("")) ? int.Parse(dr["MultiChoice_ID"].ToString().Trim()) : -1;
                double _numCorrect = Double.Parse(dr["NumCorrect"].ToString());
                double _numIncorrect = Double.Parse(dr["NumIncorrect"].ToString());
                double _difficulty = Double.Parse(dr["Difficulty"].ToString());
                List<string> _altAnswers = __altAnswers;

                questions.Add( new Question(_id, _type, _question, _answer, _topic, _multiChoice_ID, _numCorrect, _numIncorrect, _difficulty, _altAnswers));
            }
            objConn.Close();

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