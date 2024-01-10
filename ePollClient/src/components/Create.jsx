import { useState } from "react";
import { Button, Card, CardContent, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import StyledBox from "../Layouts/StyledBox";
import { ENDPOINTS, createAPIEndpoint } from "../api";

function Create({ addNewPoll, updateQuestions }) {
  const [open, setOpen] = useState(false);
  const [pollTitle, setPollTitle] = useState("");
  const [options, setOptions] = useState([
    { option: "" },
    { option: "" },
    { option: "" },
    { option: "" },
  ]);
  const [newPollTitle, setNewPollTitle] = useState("");
  const [errors, setErrors] = useState([]);

  const createPollObject = () => {
    const pollObject = {
      title: pollTitle,
      options: options.map((option) => option.option),
      votes: [0],
      answerID: [0],
    };
    return pollObject;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pollTitleChanged = (e) => {
    setPollTitle(e.target.value);
    setNewPollTitle(e.target.value);
  };

  const optionChanged = (e, index) => {
    const updatedOptions = [...options];
    updatedOptions[index].option = e.target.value;
    setOptions(updatedOptions);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("save");
      console.log("Title:", pollTitle);
      console.log("Options: ", options);

      const newPollObject = createPollObject();
      JSON.stringify(newPollObject);

      console.log("New Poll Object:", newPollObject);

      createAPIEndpoint(ENDPOINTS.both)
        .post(newPollObject)
        .then((response) => {
          console.log("New Poll Created with data:", response);
          addNewPoll(response.data);
        })
        .catch((err) => {
          console.log("POST error:", err);
        });

      addNewPoll(newPollObject);
      updateQuestions(newPollObject);

      //Bad way handling errors! :(
      //window.location.reload(false);
      handleClose();
    }
  };

  const validate = () => {
    let temp = {};
    temp.title = pollTitle.trim() !== "" ? "" : "This field is required.";
    temp.option = options.every((option) => option.option.trim() !== "")
      ? ""
      : "All options are required.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Create New Poll
      </Button>
      <Dialog open={open}>
        <DialogTitle>Add New Poll</DialogTitle>
        <DialogContent>
          <Card>
            <CardContent>
              <StyledBox>
                <form noValidate autoComplete="off" onSubmit={handleSave}>
                  <TextField
                    label="Title"
                    name="title"
                    value={pollTitle}
                    onChange={pollTitleChanged}
                    variant="outlined"
                    {...(errors.title && {
                      error: true,
                      helperText: errors.title,
                    })}
                  />
                  {options.map((option, index) => (
                    <TextField
                      key={index}
                      label={`Option ${index + 1}`}
                      name={`option${index + 1}`}
                      value={option.option}
                      onChange={(e) => optionChanged(e, index)}
                      variant="outlined"
                      {...(errors.option && {
                        error: true,
                        helperText: errors.option,
                      })}
                    />
                  ))}
                  <Button type="submit" color="primary">
                    Save
                  </Button>
                </form>
              </StyledBox>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Create;
