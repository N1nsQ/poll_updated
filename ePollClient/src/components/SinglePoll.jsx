import React, { useState, useEffect } from "react";
import {
  List,
  ListItemButton,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import StyledBox from "../Layouts/StyledBox";

const SinglePoll = ({ questionId }) => {
  const [questionData, setQuestionData] = useState();
  const [answerData, setAnswerData] = useState([]);

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.question)
      .fetchById(questionId)
      .then((response) => {
        //console.log("Questiondata from backend:", response.data);
        setQuestionData(response.data);
      })
      .catch((err) => console.log("Error fetching question:", err));
  }, [questionId]);

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.answer)
      .fetch()
      .then((response) => {
        setAnswerData(response.data);
        //console.log("Answers:", response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleVote = (questionId, answerId, currentVotes, currentOption) => {
    console.log("Question ID:", questionId);
    console.log("Answer ID:", answerId);
    console.log("Current Votes:", currentVotes);

    const newVotes = currentVotes + 1;
    console.log("New Votes:", newVotes);

    const updatedAnswer = {
      answerID: answerId,
      questionID: questionId,
      option: currentOption,
      votes: newVotes,
    };

    createAPIEndpoint(ENDPOINTS.answer)
      .put(answerId, updatedAnswer)
      .then((response) => {
        console.log("Vote updated successfully:", response.data);
        setAnswerData((prevAnswerData) => {
          const updatedData = prevAnswerData.map((answer) =>
            answer.answerID === answerId
              ? { ...answer, votes: newVotes }
              : answer
          );
          return updatedData;
        });
      })
      .catch((err) => {
        console.log("Update error:", err);
      });

    setAnswerData(answerData);
  };

  return (
    <>
      {questionData ? (
        <Card>
          <CardContent>
            <StyledBox>
              <Typography variant="h4">{questionData.title}</Typography>
              <List>
                {answerData
                  .filter(
                    (answer) => answer.questionID === questionData.questionID
                  )
                  .map((answer, index) => (
                    <ListItemButton
                      key={index}
                      sx={{ justifyContent: "space-between" }}
                      onClick={() =>
                        handleVote(
                          questionData.questionID,
                          answer.answerID,
                          answer.votes,
                          answer.option
                        )
                      }
                    >
                      {answer.option}{" "}
                      <Button disabled>Votes: {answer.votes}</Button>
                    </ListItemButton>
                  ))}
              </List>
              <div
                style={{ display: "flex", justifyContent: "flex-end" }}
              ></div>
            </StyledBox>
          </CardContent>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default SinglePoll;
