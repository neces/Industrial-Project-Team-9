using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Quizzarr.Data;
using Quizzarr.Models;
using Quizzarr.DTOs;
using System.Linq;

namespace Quizzarr.Controllers
{
    [Route("api/quizzarr")]
    [ApiController]
    public class QuizController : ControllerBase
    {

        // Holds all the data about all the sessions being used
        private static List<GameSession> Sessions = new List<GameSession>();

        // List of all users who are known but are not yet in a session
        private static List<User> LobbyUsers = new List<User>();

        // Interface to get questions
        private readonly IQuestionRepo _questionRepository;

        // Constructor
        public QuizController(IQuestionRepo questionRepository)
        {
            _questionRepository = questionRepository;
        }


        // Returns a DTO containing all the information that the front end needs
        // about a specific session
        // api/quizzarr/gameSessionStatus?userId=<your UId here>
        [HttpGet("gameSessionStatus")]
        public ActionResult<UserViewGameStatusDTO> gameSessionStatus(string userId)
        {
            GameSession gameSession = findSessionWithUser(userId);

            UserViewGameStatusDTO view = new UserViewGameStatusDTO
            {
                SessionId = gameSession.SessionId,
                QuizName = gameSession.QuizName,
                NumberOfUsers = gameSession.Users.Count,

                gameInProgress = gameSession.gameInProgress,

                NumberOfQuestions = gameSession.NumberOfQuestion,
                currentQuestion = gameSession.currentQuestion,

                NumberOfRounds = gameSession.NumberOfRounds,
                NumberOfQuestionsPerRound = gameSession.NumberOfQuestionsPerRound,
                TimeBetweenRounds = gameSession.TimeBetweenRounds,
                TimePerQuestion = gameSession.TimePerQuestion
            };

            

            return Ok(view);
        }


        // Generates a new object of class User with a display name and a unique user ID
        // the ID is then returned to be stored on the front end
        // All new users are automatically put into the LobbyUsers list
        // api/quizzarr/newUser?displayName=<your name here>
        [HttpGet("newUser")]
        public ActionResult<string> newUser(string displayName)
        {
            System.Random rand = new System.Random(System.Guid.NewGuid().GetHashCode());

            bool idFound = false;
            string val = null;
            do
            {
                val = rand.Next(999999).ToString();
                foreach (User u in LobbyUsers)
                {
                    if (val == u.Id)
                    {
                        idFound = true;
                        break;
                    }
                }
                if (!idFound)
                    foreach (GameSession session in Sessions)
                    {
                        foreach (User u in session.Users)
                        {
                            if (val == u.Id)
                            {
                                idFound = true;
                                break;
                            }
                        }
                        if (idFound) break;
                    }
            } while (idFound);


            string userId = val;

            User newUser = new User(userId, displayName);

            LobbyUsers.Add(newUser);

            PrintLobbyUsers();

            return Ok(userId);
        }


        // Creates a new session and adds it to the list of known sessions
        // api/quizzarr/newSession?hostUId=<your UId here>&quizName=<quiz name here>&numberOfRounds=<nor>&numberOfQuestionsPerRound=<norpr>&timeBetweenRounds=<tbr>&timePerQuestion=<tpq>
        [HttpGet("newSession")]
        public ActionResult<string> NewSession(string hostUId, string quizName, int numberOfRounds, int numberOfQuestionsPerRound, int timeBetweenRounds, int timePerQuestion)
        {
            if (quizName == null || quizName == "") quizName = "Quizzar Quiz";
            System.Random rand = new System.Random(System.Guid.NewGuid().GetHashCode());

            string newSessionId = null;// rand.Next(999999).ToString();

            bool isFound = false;
            do
            {
                newSessionId = (rand.Next(899999) + 100000).ToString();
                foreach (GameSession session in Sessions)
                {
                    if (newSessionId == session.SessionId)
                    {
                        isFound = true;
                        break;
                    }
                }
            } while (isFound);

            GameSession newSession = new GameSession
            {
                SessionId = newSessionId,
                QuizName = quizName,
                HostID = null,
                Users = new List<User>(),
                Questions = new List<Question>(),
                currentQuestion = 0,
                gameInProgress = false,
                NumberOfRounds = numberOfRounds,
                NumberOfQuestionsPerRound = numberOfQuestionsPerRound,
                TimeBetweenRounds = timeBetweenRounds,
                TimePerQuestion = timePerQuestion
            };

            User newUser = null;
            foreach (User u in LobbyUsers)
            {
                if (u.Id == hostUId)
                {
                    newUser = u;
                    break;
                }
            }
            if (newUser == null) return NotFound();

            LobbyUsers.Remove(newUser);
            PrintLobbyUsers();
            newSession.Users.Add(newUser);
            SetUpHost(newSession);

            Sessions.Add(newSession);

            return Ok(newSession);
        }


        // Add an existing LobbyUser to an existing Session
        // api/quizzarr/joinSession?userID=<your id here>&sessionID=<friends quiz code>
        [HttpGet("joinSession")]
        public ActionResult<string> JoinSession(string userId, string sessionID)
        {
            GameSession joinSession = null;
            foreach (GameSession session in Sessions)
            {
                if (sessionID == session.SessionId)
                {
                    joinSession = session;
                    break;
                }
            }
            if (joinSession == null) return NotFound();

            if (joinSession.gameInProgress) return NotFound();

            User user = null;
            foreach (User u in LobbyUsers)
            {
                if (u.Id == userId)
                {
                    user = u;
                    break;
                }
            }
            if (user == null) return NotFound();

            if (GetNicknameInSession(user.DisplayName, joinSession)) return NotFound();

            LobbyUsers.Remove(user);
            PrintLobbyUsers();
            joinSession.Users.Add(user);

            return Ok(joinSession.SessionId);
        }


        // Wrapper function to create a new user and join a session in one call
        // api/quizzarr/newUserAndJoin?displayName=<your name here>&sessionID=<session id>
        [HttpGet("newUserAndJoin")]
        public ActionResult<string> newUserAndJoinSession(string displayName, string sessionID) {

            var result = (OkObjectResult)newUser(displayName).Result;
            string userID = (string)result.Value;

            try {
                var resultSession = (OkObjectResult)JoinSession(userID, sessionID).Result;
            } catch (System.Exception) {
                LeaveSession(userID);
                return NotFound();
            }

            return Ok(userID);  
        }


        // Set an existing session to in progress, this stops others users joining
        // and allows all users to start requesting questions and answers
        //api/quizzarr/startSession?hostUId=<your UID here>
        [HttpGet("startSession")]
        public ActionResult StartSession(string hostUId)
        {
            GameSession session = findSessionWithUser(hostUId);

            List<Question> questions = _questionRepository.GetQuestionsSet(session.NumberOfQuestion);

            if (!session.HostID.Equals(hostUId)) return Forbid();
            
            if ((questions == null) || (questions.Count <= 0) || (session == null)) return NotFound();

            session.Questions = questions;
            session.gameInProgress = true;

            return NoContent();
        }


        // Admin Branch
        // End a session by passing in the host uid, usually used for test session cleanup 
        // api/quizzarr/admin/endSession?hostUId=<your uid herer>
        [HttpGet("admin/endSession")]
        public ActionResult EndSession(string hostUId) {

            GameSession session = findSessionWithUser(hostUId);

            if (session == null) return NotFound();

            if (!session.HostID.Equals(hostUId)) return Forbid();

            Sessions.Remove(session);

            return NoContent();
        }


        // Admin Branch
        // Ends all the sessions that are currently in progress
        // Requires a password, though this is only to stop accidental deletion
        // api/quizzarr/admin/endAllSessions?password=team9
        [HttpGet("admin/endAllSessions")]
        public ActionResult EndAllSessions(string password) {
            if (password == "team9") {
                Sessions.Clear();
                return NoContent();
            }
            return Forbid();
        }


        // Returns a DTO containing all the relevant information required to display a question
        // api/quizzarr/getQuestion?userID=<your user ID>
        [HttpGet("getQuestion")]
        public ActionResult<QuestionReadDTO> nextQuestion(string userID)
        {
            QuestionReadDTO qRead = new QuestionReadDTO();

            GameSession curSession = findSessionWithUser(userID);

            if (curSession == null) return NotFound();

            int qIndex = curSession.currentQuestion;
            System.Console.WriteLine(qIndex);

            if (qIndex >= curSession.Questions.Count) return NotFound();

            Question question = curSession.Questions[qIndex];

            if (question == null) return NotFound();

            qRead.type = question.type;
            qRead.question = question.question;
            
            if (question.type.Equals("MultiChoice")) {
                List<string> vals = new List<string>();
                vals.Add(question.answer);
                foreach(string ans in question.altAnswers)
                    vals.Add(ans);

                qRead.answers = vals.OrderBy(x => System.Guid.NewGuid()).ToList();
            } else {
                qRead.answers = new List<string>();
                qRead.answers.Add("True");
                qRead.answers.Add("False");
            }

            return Ok(qRead);
        }


        // Checks if the user has submitted the correct answer
        // If so it awards them points, if not then nothing happens 
        // api/quizzarr/submitAnswer?userID=<your user ID>&answer=<answer selected>
        [HttpGet("submitAnswer")]
        public ActionResult answerQuestion(string userID, string answer)
        {
            GameSession curSession = findSessionWithUser(userID);

            if (curSession == null) return NotFound();

            int qIndex = curSession.currentQuestion;

            User user = GetUserInSession(findSessionWithUser(userID), userID);

            if (user.Answered) return Forbid();

            user.Answered = true;

            bool ans = false;
            if (answer == null) {
                // This catches any null answers and treats them as an incorrect answer
                // Do nothing as the ans variable is already set to null
            } else if (answer.ToLower().Equals(curSession.Questions[qIndex].answer.ToLower())) {
                ans = true;
            }
            GetUserInSession(findSessionWithUser(userID), userID).MyScore.UpdateScore(ans);
            
            // if (CheckIfAllAnswered(curSession)) {
            //     curSession.currentQuestion += 1;
            //     System.Console.WriteLine("New current question num " + curSession.currentQuestion);
            //     SetAllUnanswered(curSession);
            // }

            return Ok(ans);
        }


        // Returns the correct answer for the current question in the session
        // api/quizzarr/getCorrectAnswer?userID=<your id here>
        [HttpGet("getCorrectAnswer")]
        public ActionResult <string> getCorrectAnswer(string userID) {

            GameSession session = findSessionWithUser(userID);
            if (session == null) { System.Console.WriteLine("Session not found"); return NotFound(); }
            
            User user = GetUserInSession(session, userID);
            if (user == null) { System.Console.WriteLine("User not found"); return NotFound(); }

            string answer = session.Questions[session.currentQuestion].answer;
            if (answer == null) { System.Console.WriteLine("Answer not found"); return NotFound(); }

            user.GotAnswer = true;

            // Ensures all users have both answered and received the correct answer
            // If so, moves the session onto the next question
            if (CheckIfAllAnswered(session) && CheckIfAllGotAnswer(session)) {
                session.currentQuestion += 1;
                System.Console.WriteLine("New current question num " + session.currentQuestion);
                SetAllUnanswered(session);
                SetAllGotAnswerFalse(session);
            }
            
            if (answer.ToLower().Equals("true")) answer = "True";
            else if (answer.ToLower().Equals("false")) answer = "False";

            return Ok(answer);
        }


        // Returns a leaderboard for the session that the user is in
        // api/quizzarr/getLeaderboard?userID=<your user id here>
        [HttpGet("getLeaderBoard")]
        public ActionResult GetLeaderBoard(string userID)
        {
            List<Leaderboard> leaderboard = new List<Leaderboard>();

            GameSession session = findSessionWithUser(userID);

            foreach(User u in session.Users) {
                leaderboard.Add(new Leaderboard(u.DisplayName, u.MyScore.Score, u.MyScore.highestStreak));
            }

            leaderboard.Sort((a, b) => b.score.CompareTo(a.score));

            return Ok(leaderboard);
        }


        // Removes a user from the session they are in to allow the game to continue
        // api/quizzarr/leaveSession?userID=<your uid>
        [HttpGet("leaveSession")]
        public ActionResult LeaveSession(string userID) {
            bool userInSession = true;

            GameSession session = findSessionWithUser(userID);
            
            User user = null;
            if (session == null) {
                user = GetUserInLobby(userID);
                userInSession = false;
            } else {
                user = GetUserInSession(session, userID);
            }
            if (user == null) return NotFound();

            if (userInSession) {
                session.Users.Remove(user);

                if (session.Users.Count <= 0) 
                    Sessions.Remove(session);
                else
                    SetUpHost(session);
            } else {
                LobbyUsers.Remove(user);
            }
            
            return NoContent();
        }
        

        [HttpPost("leave")]
        public void Post([FromBody] string userID) {
            LeaveSession(userID);
        }

        
        // Returns the session that the user is a part of 
        public GameSession findSessionWithUser(string userID)
        {
            GameSession curSession = null;
            foreach (GameSession session in Sessions)
            {
                foreach (User u in session.Users)
                {
                    if (userID.Equals(u.Id))
                    {
                        curSession = session;
                        break;
                    }
                    if (curSession != null) break;
                }
            }
            return curSession;
        }


        // Checks to see if all the users in the session have answered
        public bool CheckIfAllAnswered(GameSession session) {
            foreach (User u in session.Users)
            {
                if (!u.Answered)
                    return false;
            }
            return true;
        }


        // Resets all users in a session to a false answer state (preparing for next question)
        public void SetAllUnanswered(GameSession session) {
            foreach (User u in session.Users)
                u.Answered = false;
        }


        // Checks all users in a session to see if they have all requested the correct answer
        public bool CheckIfAllGotAnswer(GameSession session) {
            foreach (User u in session.Users)
            {
                if (!u.GotAnswer)
                    return false;
            }
            return true;
        }



        // Resets all users in a session to a false request answer state (preparing for next question)
        public void SetAllGotAnswerFalse(GameSession session) {
            foreach (User u in session.Users)
                u.GotAnswer = false;
        }


        // Gets a specific user in a session
        public User GetUserInSession(GameSession session, string userID) {
            foreach (User u in session.Users)
                if (userID.Equals(u.Id))
                    return u;

            return null;
        }


        // Checks the session user list to check if the nickname is already taken
        public bool GetNicknameInSession(string nickname, GameSession session) {
            foreach (User u in session.Users)
                if (nickname.Equals(u.DisplayName))
                    return true;

            return false;
        }


        // Gets a specific user in the user lobby
        public User GetUserInLobby(string userID) {
            foreach (User u in LobbyUsers)
                if (userID.Equals(u.Id))
                    return u;

            return null;
        }


        // Sets the host of the game to the first user in the list of users
        // Used to ensure there is always a host (even if host leaves)
        public void SetUpHost(GameSession session) {
            session.HostID = session.Users[0].Id;
        }

        // ==================================================================================
        //                               TESTING FUNCTIONS

        // Prints all the lobby users to the console
        public void PrintLobbyUsers()
        {
            foreach (User u in LobbyUsers) { System.Console.WriteLine(u.Id + " " + u.DisplayName); }
            System.Console.WriteLine();
        }


        // Prints all the session ids and user count in the console
        // Returns all the sessions in json format
        [HttpGet]
        public ActionResult PrintAllSessionIDs()
        {
            foreach (GameSession session in Sessions)
                System.Console.WriteLine(session.SessionId + " - " + session.Users.Count + " users in session");

            return Ok(Sessions);
        }

    }
}