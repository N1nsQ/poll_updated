import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { Card, CardContent, Typography, List, ListItem } from "@mui/material";
import StyledBox from "../Layouts/StyledBox";
import SingleOption from "./SingleOption";

const OptionCard = ({ options }) => (
  <StyledBox>
    <ListItem style={{ marginBottom: "20px" }}>
      <div>
        <Card>
          <List>
            {options.map((option, index) => (
              <ListItem key={index}>
                <SingleOption optionId={option.answerID} />
              </ListItem>
            ))}
          </List>
        </Card>
      </div>
    </ListItem>
  </StyledBox>
);

export default function Options() {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.answer)
      .fetch()
      .then((response) => {
        setOptions(response.data);
        //console.log(response.data);
      })
      .catch((err) => console.log("Error fetching answer:", err));
  }, []);

  return (
    <Card>
      <CardContent>
        <StyledBox>
          <Typography variant="h5" align="center">
            Options
          </Typography>
          <List>
            <OptionCard options={options} />
          </List>
        </StyledBox>
      </CardContent>
    </Card>
  );
}
