using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Quizzarr.Data;
using Quizzarr.Models;

namespace Quizzarr.Controllers
{
    [Route("api/quizzarr")]
    [ApiController]
    public class QuizController : ControllerBase
    {

        private static List<GameSession> Sessions = new List<GameSession>();
        private static List<User> LobbyUsers = new List<User>();
        private readonly IQuizzarrRepo _repository;
        private readonly IQuestionRepo _questionRepository;

        public QuizController(IQuizzarrRepo repository, IQuestionRepo questionRepository)
        {
            _repository = repository;
            _questionRepository = questionRepository;
        }

        // [HttpGet("{id}")]
        // public ActionResult<GameSession> GetSessionById(string id)
        // {
        //     var session = _repository.GetSessionById(id);

        //     return Ok(session);
        // }


        [HttpGet("gameSessionStatus")]
        public ActionResult<UserViewGameStatus> gameSessionStatus(string userId)
        {

            /*
                1. Get this users session / return 4xx code if no session exists for this user
                2. create UserViewGameStatus instance
                    2.1 populate this instance with data from the users game session
                3. return the populated UserViewGameStatus instance
            */

            GameSession gameSession = findSessionWithUser(userId);

            UserViewGameStatus view = new UserViewGameStatus
            {
                SessionId = gameSession.SessionId,
                QuizCode = gameSession.QuizCode,
                currentQuestion = gameSession.currentQuestion,
                gameInProgress = gameSession.gameInProgress
            };

            return Ok(view);
        }


        // GetUId is generates new userId for a client that requests it; the id is added to list of all UIds
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

        // api/quizzarr/newSession?hostUId=<your UId here>
        [HttpGet("newSession")]
        public ActionResult<string> NewSession(string hostUId)
        {
            System.Random rand = new System.Random(System.Guid.NewGuid().GetHashCode());

            string newSessionId = null;// rand.Next(999999).ToString();
            string newQuizCode = (rand.Next(89999999) + 10000000).ToString();

            bool isFound = false;
            do
            {
                newSessionId = rand.Next(999999).ToString();
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
                QuizCode = newQuizCode,
                HostID = null,
                Users = new List<User>(),
                Questions = new List<Question>(),
                currentQuestion = 0,
                gameInProgress = false
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

        // api/quizzarr/joinSession?userID=<your id here>&sessionID=<friends quiz code>
        [HttpGet("joinSession")]
        public ActionResult<PlaceholderType> JoinSession(string userId, string sessionID)
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

            LobbyUsers.Remove(user);
            PrintLobbyUsers();
            joinSession.Users.Add(user);

            return Ok(joinSession);
        }


        // api/quizzarr/newUserAndJoin?displayName=<your name here>&sessionID=<session id>
        [HttpGet("newUserAndJoin")]
        public ActionResult<string> newUserAndJoinSession(string displayName, string sessionID) {

            var result = (OkObjectResult)newUser(displayName).Result;
            string userID = (string)result.Value;

            JoinSession(userID, sessionID);

            return Ok(userID);
        }

        
        //api/quizzarr/startSession?hostUId=<your UID here>
        [HttpGet("startSession")]
        public ActionResult<PlaceholderType> StartSession(string hostUId)
        {
            List<Question> questions = _questionRepository.GetQuestionsSet();

            System.Console.WriteLine(questions.Count);

            GameSession session = findSessionWithUser(hostUId);

            if (!session.HostID.Equals(hostUId)) return Forbid();

            if ((questions == null) || (questions.Count <= 0) || (session == null)) return NotFound();

            session.Questions = questions;
            session.gameInProgress = true;

            return NoContent();
        }


        // api/quizzarr/getQuestion?userID=<your user ID>
        [HttpGet("getQuestion")]
        public ActionResult<Question> nextQuestion(string userID)
        {

            GameSession curSession = findSessionWithUser(userID);

            if (curSession == null) return NotFound();

            int qIndex = curSession.currentQuestion;
            System.Console.WriteLine(qIndex);

            if (qIndex >= curSession.Questions.Count) return NotFound();

            Question question = curSession.Questions[qIndex];

            if (question == null) return NotFound();

            return Ok(question);
        }

        // api/quizzarr/submitAnswer?userID=<your user ID>&answer=<answer selected>
        [HttpGet("submitAnswer")]
        public ActionResult<PlaceholderType> answerQuestion(string userID, string answer)
        {

            GameSession curSession = findSessionWithUser(userID);

            int qIndex = curSession.currentQuestion;

            GetUserInSession(findSessionWithUser(userID), userID).Answered = true;

            bool ans = false;
            if (answer.Equals(curSession.Questions[qIndex].answer)) {
                ans = true;

            }
            GetUserInSession(findSessionWithUser(userID), userID).MyScore.UpdateScore(ans);
            
            if (CheckIfAllAnswered(curSession)) {
                curSession.currentQuestion += 1;
                System.Console.WriteLine("New current question num " + curSession.currentQuestion);
                SetAllUnanswered(curSession);
            }

            return Ok(ans);
        }


        // api/quizzarr/getCorrectAnswer?userID=<your id here>
        [HttpGet("getCorrectAnswer")]
        public ActionResult <string> getCorrectAnswer(string userID) {

            GameSession session = findSessionWithUser(userID);
            if (session == null) { System.Console.WriteLine("Session not found"); return NotFound(); }

            string answer = session.Questions[session.currentQuestion - 1].answer;
            if (answer == null) { System.Console.WriteLine("Answer not found"); return NotFound(); }

            return Ok(answer);
        }


        // api/quizzarr/getLeaderboard?userID=<your user id here>
        [HttpGet("getLeaderBoard")]
        public ActionResult <PlaceholderType> GetLeaderBoard(string userID)
        {
            List<Leaderboard> leaderboard = new List<Leaderboard>();

            GameSession session = findSessionWithUser(userID);

            foreach(User u in session.Users) {
                leaderboard.Add(new Leaderboard(u.DisplayName, u.MyScore.Score, u.MyScore.highestStreak));
            }

            return Ok(leaderboard);
        }

        // api/quizzarr/leaveSession?userID=<your uid>
        [HttpGet("leaveSession")]
        public ActionResult <PlaceholderType> LeaveSession(string userID) {
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

        public bool CheckIfAllAnswered(GameSession session)
        {
            foreach (User u in session.Users)
            {
                if (!u.Answered)
                    return false;
            }
            return true;
        }

        public void SetAllUnanswered(GameSession session)
        {
            foreach (User u in session.Users)
                u.Answered = false;
        }

        public User GetUserInSession(GameSession session, string userID) {
            foreach (User u in session.Users)
                if (userID.Equals(u.Id))
                    return u;

            return null;
        }

        public User GetUserInLobby(string userID) {
            foreach (User u in LobbyUsers)
                if (userID.Equals(u.Id))
                    return u;

            return null;
        }

        public void SetUpHost(GameSession session) {
            session.HostID = session.Users[0].Id;
        }

        // ==================================================================================
        public void PrintLobbyUsers()
        {
            foreach (User u in LobbyUsers) { System.Console.WriteLine(u.Id + " " + u.DisplayName); }
            System.Console.WriteLine();
        }

        [HttpGet]
        public ActionResult<PlaceholderType> PrintAllSessionIDs()
        {
            foreach (GameSession session in Sessions)
                System.Console.WriteLine(session.SessionId + " - " + session.Users.Count + " users in session");

            return Ok(Sessions);
        }

    }
}