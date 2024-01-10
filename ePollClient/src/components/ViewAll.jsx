import React, { useState, useEffect } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../api";
import {
  Card,
  CardContent,
  Icon,
  InputBase,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import StyledBox from "../Layouts/StyledBox";
import { SearchTwoTone } from "@mui/icons-material";
import { Link } from "react-router-dom";

function ViewAll({ onQuestionClick, questionList, setQuestionList }) {
  const [searchKey, setSearchKey] = useState("");
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then((response) => {
        setQuestionList(response.data);
        setSearchList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setQuestionList]);

  useEffect(() => {
    if (questionList) {
      let x = [...questionList];
      x = x.filter((y) => {
        return (
          y &&
          y.title &&
          y.title.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())
        );
      });
      setSearchList(x);
    }
  }, [searchKey, questionList]);

  // console.log('QuestionList', questionList)
  return (
    <>
      <Card>
        <CardContent>
          <StyledBox>
            <Typography variant="h5" align="center">
              View All
            </Typography>
            <Paper style={{ display: "flex", alignItems: "center" }}>
              <Icon>
                <SearchTwoTone />
              </Icon>
              <InputBase
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder="Search for a poll"
                style={{ flex: 1 }}
              />
            </Paper>
            <List>
              {searchList.map((question, index) => (
                <ListItem
                  key={index}
                  onClick={() => onQuestionClick(question.questionID)}
                >
                  <Link style={{ color: 'lightBlue' }}>{question.title}</Link>
                </ListItem>
              ))}
            </List>
          </StyledBox>
        </CardContent>
      </Card>
    </>
  );
}

export default ViewAll;
