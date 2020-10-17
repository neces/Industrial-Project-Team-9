using System.Collections.Generic;

namespace Quizzarr.DTOs {

    public class QuestionReadDTO {

        public string type { get; set; }
        public string question { get; set; }
        public string correctAnswer { get; set; }
        public List<string> answers { get; set; }

    }

}