import React from "react";
import memoFunctionComp from "../src/optimistic/memoFunctionComp";

const FancyButton = (props, ref) => {
  return <button ref={ref}>{props.children} </button>;
};

const MemoFancyButton = memoFunctionComp<HTMLButtonElement, any>(FancyButton);
