import rules from "./rules";
import Regex from "./Regex";

const validaitor = (value, validaitions) => {
  let validaitionResult = [];

  for (const validaitor of validaitions) {
    if (validaitor.value === rules.requierdValidaitor) {
      value.trim().length === 0 && validaitionResult.push(false);
    }
    if (validaitor.value === rules.minValue) {
      value.trim().length < validaitor.min && validaitionResult.push(false);
    }
    if (validaitor.value === rules.maxValue) {
      value.trim().length > validaitor.max && validaitionResult.push(false);
    }
    if (validaitor.value === rules.emailValue) {
      !Regex.testEmail(value) && validaitionResult.push(false)
    }
  }
  if (validaitionResult.length) {
    return false;
  } else {
    return true;
  }
};

export default validaitor;
