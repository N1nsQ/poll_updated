import { useState, useEffect } from "react";
import Create from "./Create";
import { Container, Grid, Card, Typography, Button } from "@mui/material";
import ViewAll from "./ViewAll";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import SinglePoll from "./SinglePoll";
import { Link } from "react-router-dom";

function Home() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [pollQuestions, setPollQuestions] = useState([]);
  const [questionId, setQuestionId] = useState(1);
  const [questionList, setQuestionList] = useState([]);

  const addNewQuestion = (newQuestion) => {
    setQuestionList((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then((response) => response.data)
      .then((data) => {
        if (data.length > 0) {
          setSelectedQuestion(data[0]);
          //console.log("Data 0:", data[0])
          setQuestionId(data[0].questionID);
          setPollQuestions(data);
        }
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const updateQuestionList = (newQuestionList) => {
    setPollQuestions(newQuestionList);
  };

  const handleQuestionClick = (question) => {
    console.log("Vastauksena saatiin", question);
    setQuestionId(question);
  };

  return (
    <>
      <Container>
        <Typography variant="h2" align="center" sx={{ p: 3 }}>
          Welcome to ePoll!
        </Typography>
        <Grid container spacing={5} justify="center">
          <Grid item xs={12} md={4}>
            <Card>
              <ViewAll
                onQuestionClick={handleQuestionClick}
                questionList={questionList}
                setQuestionList={setQuestionList}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <SinglePoll
                questionId={questionId}
                addNewPoll={updateQuestionList}
              />
            </Card>
            <div style={{ marginTop: 20 }}>
              <Create
                addNewPoll={addNewQuestion}
                updateQuestions={handleQuestionClick}
              />
              <Button variant="outlined" style={{ float: "right" }}>
                <Link to="/polls" style={{ color: "lightBlue" }}>
                  View Results
                </Link>
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
