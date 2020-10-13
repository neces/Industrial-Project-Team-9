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

            Sessions.Add(
                new GameSession
                {
                    SessionId="session01",
                    Users = new List<User>{
                        new User {Id="0", DisplayName="Bob"},
                        new User {Id="0", DisplayName="Jan"},
                        new User {Id="0", DisplayName="Joe"}
                    },
                    Questions = new List<Question>(),
                    currentQuestion = 0
                }
            );

            Sessions.Add(
                new GameSession
                {
                    SessionId="session02",
                    Users = new List<User>{
                        new User {Id="0", DisplayName="Topu"},
                        new User {Id="0", DisplayName="Cammy"},
                        new User {Id="0", DisplayName="Jordan"},
                        new User {Id="0", DisplayName="Melvin"}
                    },
                    Questions = new List<Question>(),
                    currentQuestion = 0
                }
            );
        }

        [HttpGet("{id}")]
        public ActionResult<GameSession> GetSessionById(string id)
        {
            var session = _repository.GetSessionById(id);

            return Ok(session);
        }

        // GetUId is generates new userId for a client that requests it; the id is added to list of all UIds
        // api/quizzarr/newUser?displayName=<your name here>
        [HttpGet("newUser")]
        public ActionResult<string> newUser(string displayName)
        {
            System.Random rand = new System.Random(System.Guid.NewGuid().GetHashCode());
            
            bool idFound = false;
            string val = null;
            do {            
                val = rand.Next(999999).ToString();
                foreach (User u in LobbyUsers) {
                    if (val == u.Id) {
                        idFound = true;
                        break;
                    }
                }
                if (!idFound)
                    foreach(GameSession session in Sessions) {
                        foreach(User u in session.Users) {
                            if (val == u.Id) {
                                idFound = true;
                                break;
                            }
                        }
                        if (idFound) break;
                    }
            } while (idFound);


            string userId = val;

            User newUser = new User { Id = userId, DisplayName = displayName };

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
            do {
                newSessionId = rand.Next(999999).ToString();
                foreach(GameSession session in Sessions) {
                    if (newSessionId == session.SessionId) {
                        isFound = true;
                        break;
                    }
                }
            } while (isFound);

            GameSession newSession = new GameSession {
                SessionId = newSessionId,
                QuizCode = newQuizCode,
                Users = new List<User>(),
                Questions = new List<Question>(),
                currentQuestion = 0
            };

            User newUser = null;
            foreach(User u in LobbyUsers) {
                if (u.Id == hostUId) {
                    newUser = u;
                    break;
                }
            }
            if (newUser == null) return NotFound();

            LobbyUsers.Remove(newUser);
            PrintLobbyUsers();
            newSession.Users.Add(newUser);

            Sessions.Add(newSession);

            return Ok(newSession);
        }

        // api/quizzarr/joinSession?userID=<your id here>&quizCode=<friends quiz code>
        [HttpGet("joinSession")]
        public ActionResult<PlaceholderType> JoinSession(string userId, string quizCode)
        {
            GameSession joinSession = null;
            foreach(GameSession session in Sessions) {
                if (quizCode == session.QuizCode) {
                    joinSession = session;
                    break;
                }
            }
            if (joinSession == null) return NotFound();

            User user = null;
            foreach(User u in LobbyUsers) {
                if (u.Id == userId) {
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

        public ActionResult <PlaceholderType> StartSession() {
            return null;
        }


        // api/quizzarr/byQuestion?sessionID=session01                             &qIndex=0
        [HttpGet("byQuestion")]
        public ActionResult <Question> nextQuestion(string sessionID) {

            //GameSession curSession = _repository.GetSessionById(sessionID);
            GameSession curSession = null;
            foreach (GameSession session in Sessions)
            {
                if (session.SessionId.Equals(sessionID)){
                    curSession = session;
                    break;
                }
            }
            
            if (curSession == null) return NotFound();

            int qIndex = curSession.currentQuestion++;

            Question question = _questionRepository.GetQuestionsSet(qIndex);

            if (question == null) return NotFound();

            return Ok(question);
        }

        public ActionResult <PlaceholderType> answerQuestion() {
            return null;
        }


        public ActionResult <PlaceholderType> getStatus()
        {
            return null;
        }

        public ActionResult <PlaceholderType> GetResult()
        {
            return null;
        }

        // public static string RandomString(int length)
        // {​​​​​
        //     System.Random random = new System.Random();
        //     const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        //     return new string(System.Linq.Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)]).ToArray());
        // }​​​​​


        // ==================================================================================
        public void PrintLobbyUsers() {
            foreach (User u in LobbyUsers) { System.Console.WriteLine(u.Id + " " + u.DisplayName); }
            System.Console.WriteLine();
        }


    }
}