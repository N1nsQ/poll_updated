import React from "react";
import { useParams } from "react-router";
import SingleOption from "./SingleOption";

export default function Vote() {
  const { option } = useParams();

  return (
    <div>
      <SingleOption optionId={option} />
    </div>
  );
}
