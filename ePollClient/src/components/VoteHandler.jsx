import { createAPIEndpoint, ENDPOINTS } from '../api';

const useVoteHandler = () => {
  const handleVote = (questionId, answerId, currentVotes, currentOption, setAnswerData) => {
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
  };

  return handleVote;
};

export default useVoteHandler;
