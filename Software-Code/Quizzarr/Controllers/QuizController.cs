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

        private List<GameSession> Sessions;
        private List<User> Users;
        private readonly IQuizzarrRepo _repository;

        public QuizController(IQuizzarrRepo repository)
        {
            _repository = repository;
        }

        [HttpGet("{id}")]
        public ActionResult<GameSession> GetSessionById(string id)
        {
            var session = _repository.GetSessionById(id);

            return Ok(session);
        }

        // GetUId is generates new userId for a client that requests it; the id is added to list of all UIds
        public ActionResult<string> newUser(string displayName)
        {
            /*
                1. Generate new UID
                2. Create new User with new UID and displayName
                3. add new user to user list
            */

            return null;
        }

        public ActionResult<string /*QuizCode*/> NewSession(string hostUId)
        {
            return null;
        }

        public ActionResult<PlaceholderType> JoinSession(string quizCode, string joiningUserId)
        {
            /*
                1. add user to session with matching quizCode
            */

            return null;
        }

        public ActionResult <PlaceholderType> StartSession() {
            return null;
        }

        public ActionResult <Question> nextQuestion() {
            return null;
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

    }
}