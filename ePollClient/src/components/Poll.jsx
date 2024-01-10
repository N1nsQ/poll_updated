import React, { useState } from 'react';
import { useParams } from 'react-router';
import SinglePoll from './SinglePoll';

const Poll = () => {

  const [poll, setPoll] = useState([])
  const { id } = useParams()

  return (
    <div>
      <h2>Poll Details</h2>
      <SinglePoll questionId={id} />
    </div>
  );
        }
export default Poll;
