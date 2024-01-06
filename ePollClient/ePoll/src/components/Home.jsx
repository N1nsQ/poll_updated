import { Link } from "react-router-dom";
import Poll from "./Poll";
import { useState, useEffect } from "react";
import Create from "./Create";
import { Container, Grid, Card, Typography } from "@mui/material";
import AllPolls from "./AllPolls";
import { createAPIEndpoint, ENDPOINTS } from "../api";

function Home() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [pollQuestions, setPollQuestions] = useState([]);
  const [questionId, setQuestionId] = useState(1);
  const [questionList, setQuestionList] = useState([]); // sent to the AllPoll

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

  //console.log("Question:", pollQuestions)
  //console.log("Selected: ", selectedQuestion)

  const updateQuestionList = (newQuestionList) => {
    setPollQuestions(newQuestionList);
  };

  /*const updateQuestionId = (newId) => {
    setQuestionId(newId);
  };*/

  const handleQuestionClick = (question) => {
    //console.log("Vastauksena saatiin", question)
    setQuestionId(question);
    console.log("Hello", question);
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
              <AllPolls
                onQuestionClick={handleQuestionClick}
                questionList={questionList}
                setQuestionList={setQuestionList}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <Poll 
                questionId={questionId}
                addNewPoll={updateQuestionList}   
             />
            </Card>
            <div style={{ marginTop: 20 }}>
              <Create 
                addNewPoll={addNewQuestion}
                updateQuestions={handleQuestionClick}
                //updateQuestionId={updateQuestionId}
                />
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
