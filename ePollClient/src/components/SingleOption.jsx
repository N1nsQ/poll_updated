import React, { useState, useEffect } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../api";
import { Button, ListItemButton } from "@mui/material";

export default function SingleOption({ optionId }) {
  const [singleOption, setSingleOption] = useState([]);

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.answer)
      .fetchById(optionId)
      .then((response) => {
        setSingleOption(response.data);
        //console.log(response.data);
      })
      .catch((err) => console.log("Error fetching answer data:", err));
  }, [optionId]);

  return (
    <ListItemButton sx={{ justifyContent: "space-between" }}>
      {singleOption.option}{" "}
      <Button disabled>Votes: {singleOption.votes}</Button>
    </ListItemButton>
  );
}
