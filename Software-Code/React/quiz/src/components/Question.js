import React, {useState} from "react";

const Question = ({ questions }) => (
    <div>
        {questions[0].question}
    </div>
  );

  export default Question;