const requierdValue = "REQUIRED_VALUE";
const minValue = "MIN-VALUE";
const maxValue = "MAX-VALUE";
const emailValue = "EMAIL-VALUE";

export const requierdValidaitor = () => ({
  value: requierdValue,
});

export const minValidaitor = (min) => ({
  value: minValue,
  min,
});

export const maxValidaitor = (max) => ({
  value: maxValue,
  max,
});

export const emailValidaitor = () => ({
  value: emailValue,
});

export default {
  requierdValidaitor,
  minValidaitor,
  maxValidaitor,
  emailValidaitor,
};
