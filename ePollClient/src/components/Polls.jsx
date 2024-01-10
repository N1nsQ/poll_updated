import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { Card, CardContent, Typography, List, ListItem } from "@mui/material";
import StyledBox from "../Layouts/StyledBox";

const QuestionCard = ({ question }) => (
  <StyledBox>
    <ListItem style={{ marginBottom: "20px" }}>
      <div>
        <Typography variant="h6">{question.title}</Typography>
        <Card>
          <List>
            {question.answers.map((answer) => (
              <ListItem key={answer.answerID}>
                {answer.option} - Votes: {answer.votes}
              </ListItem>
            ))}
          </List>
        </Card>
      </div>
    </ListItem>
  </StyledBox>
);

const Polls = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then((response) => {
        setPolls(response.data);
      })
      .catch((err) => console.log("Error fetching question:", err));
  }, []);

  return (
    <Card>
      <CardContent>
        <StyledBox>
          <Typography variant="h5" align="center">
            View All
          </Typography>
          <List>
            {polls.map((poll) => (
              <QuestionCard key={poll.questionID} question={poll} />
            ))}
          </List>
        </StyledBox>
      </CardContent>
    </Card>
  );
};

export default Polls;
