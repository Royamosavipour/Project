import React, { useEffect, useReducer } from "react";
import validaitor from "../../Validaitors/Validaitor";

import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      return {
        ...state,
        value: action.value,
        isValid: validaitor(action.value,action.validations)
      };
    }

    default: {
      return state;
    }
  }
};

export default function Input(props) {
  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const {value,isValid}=mainInput
  const {id,onInputHandeler}=props

useEffect(()=>{
  onInputHandeler(id,value,isValid)
},[value])





  const onChangeHadeler = (event) => {
    dispatch({
      type: "CHANGE",
      value:event.target.value,
      isValid:true,
      validations:props.validations,
    });
  };

  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={`${props.className} ${mainInput.isValid?'success':'error'}`}
        onChange={onChangeHadeler}
        value={mainInput.value}
      />
    ) : (
      <textarea
        placeholder={props.placeholder}
        className={`${props.className} ${mainInput.isValid?'success':'error'}`}
        onChange={onChangeHadeler}
        value={mainInput.value}
      />
    );

  return <div>{element}</div>;
}
