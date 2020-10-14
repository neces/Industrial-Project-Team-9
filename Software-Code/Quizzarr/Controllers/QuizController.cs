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

            // Sessions.Add(
            //     new GameSession
            //     {
            //         SessionId="session01",
            //         Users = new List<User>{
            //             new User ("001", "Bob"),
            //             new User ("002","Jan"),
            //             new User ("003", "Joe")
            //         },
            //         Questions = new List<Question> {
            //             new Question { id=0, type="MultiChoice", question="What is my name?", answer="Topu", topic="Personal", multiChoice_ID=0, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{"Jordan", "Cammy", "Melvin"} },
            //             new Question { id=1, type="MultiChoice", question="What is my fav colour?", answer="Purple", topic="Personal", multiChoice_ID=1, numCorrect=1, numIncorrect=10, difficulty=(1/10), altAnswers= new List<string>{"Green", "Blue", "Red"} }
            //         },
            //         currentQuestion = 0
            //     }
            // );

            // Sessions.Add(
            //     new GameSession
            //     {
            //         SessionId="session02",
            //         Users = new List<User>{
            //             new User ("004", "Jordan"),
            //             new User ("005","Topu"),
            //             new User ("006", "Cammy")
            //         },
            //         Questions = new List<Question>(),
            //         currentQuestion = 0
            //     }
            // );
        }

        // [HttpGet("{id}")]
        // public ActionResult<GameSession> GetSessionById(string id)
        // {
        //     var session = _repository.GetSessionById(id);

        //     return Ok(session);
        // }

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
                currentQuestion = 0,
                gameInProgress = false
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

        // api/quizzarr/joinSession?userID=<your id here>&sessionID=<friends quiz code>
        [HttpGet("joinSession")]
        public ActionResult<PlaceholderType> JoinSession(string userId, string sessionID)
        {
            GameSession joinSession = null;
            foreach(GameSession session in Sessions) {
                if (sessionID == session.SessionId) {
                    joinSession = session;
                    break;
                }
            }
            if (joinSession == null) return NotFound();

            if (joinSession.gameInProgress) return NotFound();

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

        //api/quizzarr/startSession?hostUId=<your UID here>
        [HttpGet("startSession")]
        public ActionResult <PlaceholderType> StartSession(string hostUId) {
            /*
                Generate list of random question numbers to get from database
                Get a list of questions
                Populate session question list with that list
                Mark session as "in progress" so that other users can no longer join
                    Update join session func to reflect this
                Push to all users in session that the game is starting
            */
            List<Question> questions = _questionRepository.GetQuestionsSet();

            System.Console.WriteLine(questions.Count);

            GameSession session = findSessionWithUser(hostUId);

            if ((questions == null) || (questions.Count <= 0) || (session == null)) return NotFound();

            session.Questions = questions;
            session.gameInProgress = true;
            
            return NoContent();
        }


        // api/quizzarr/getQuestion?userID=<your user ID>
        [HttpGet("getQuestion")]
        public ActionResult <Question> nextQuestion(string userID) {

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
        public ActionResult <PlaceholderType> answerQuestion(string userID, string answer) {
            
            GameSession curSession = findSessionWithUser(userID);

            int qIndex = curSession.currentQuestion;

            // foreach(User u in curSession.Users) {
            //     if (userID.Equals(u.Id)) {
            GetUserInSession(findSessionWithUser(userID), userID).Answered = true;
            //     }
            // }

            bool ans = false;
            if (answer.Equals(curSession.Questions[qIndex].answer)) {
                ans = true;
                UpdateScore(userID);
            }
            
            if (CheckIfAllAnswered(curSession)) {
                curSession.currentQuestion += 1;
                System.Console.WriteLine("New current question num " + curSession.currentQuestion);
                SetAllUnanswered(curSession);
            }
            
            return Ok(ans);
        }


        public ActionResult <PlaceholderType> getStatus()
        {
            return null;
        }

        // api/quizzarr/getLeaderboard?userID=<your user id here>
        [HttpGet("getLeaderBoard")]
        public ActionResult <PlaceholderType> GetLeaderBoard(string userID)
        {
            List<Leaderboard> leaderboard = new List<Leaderboard>();

            GameSession session = findSessionWithUser(userID);

            foreach(User u in session.Users) {
                leaderboard.Add(new Leaderboard(u.DisplayName, u.Score));
            }

            return Ok(leaderboard);
        }

        // public static string RandomString(int length)
        // {​​​​​
        //     System.Random random = new System.Random();
        //     const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        //     return new string(System.Linq.Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)]).ToArray());
        // }​​​​​

        public GameSession findSessionWithUser(string userID) {
            GameSession curSession = null;
            foreach (GameSession session in Sessions)
            {
                foreach (User u in session.Users) {
                    if (userID.Equals(u.Id)) {
                        curSession = session;
                        break;
                    }
                    if (curSession != null) break;
                }
            }
            return curSession;
        }

        public bool CheckIfAllAnswered(GameSession session) {
            foreach (User u in session.Users) {
                if (!u.Answered)
                    return false;
            }
            return true;
        }

        public void SetAllUnanswered(GameSession session) {
            foreach (User u in session.Users)
                u.Answered = false;
        }

        public void UpdateScore(string userID) {
            GetUserInSession(findSessionWithUser(userID), userID).Score++;
        }

        public User GetUserInSession(GameSession session, string userID) {
            foreach (User u in session.Users)
                if (userID.Equals(u.Id))
                    return u;

            return null;
        }

        // ==================================================================================
        public void PrintLobbyUsers() {
            foreach (User u in LobbyUsers) { System.Console.WriteLine(u.Id + " " + u.DisplayName); }
            System.Console.WriteLine();
        }

        [HttpGet]
        public ActionResult <PlaceholderType> PrintAllSessionIDs() {
            foreach(GameSession session in Sessions)
                System.Console.WriteLine(session.SessionId + " - " + session.Users.Count + " users in session");

            return Ok(Sessions);
        }

    }
}