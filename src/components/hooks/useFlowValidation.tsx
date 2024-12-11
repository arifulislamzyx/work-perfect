import { useContext } from "react";
import { FlowValidatioContext } from "../context/FlowValidationContext";

const UseFlowValidation = () => {
  const context = useContext(FlowValidatioContext);

  if (!context) {
    throw new Error("UseValidatio must be used with a FlowValidationContext");
  }
  return context;
};

export default UseFlowValidation;
