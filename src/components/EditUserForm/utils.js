export const INITIAL_STATE = {
  inputs: {
    email: {
      value: '',
      validity: false,
    },
    role: {
      value: '',
      validity: false,
    }
  },
  isFormValid: false,
  isSubmitted: false,
  lastData: ''
};

export const FORM_FIELD_CHANGE = 'FORM_FIELD_CHANGE';
export const FORM_FIELD_SET_VALIDITY = 'FORM_FIELD_SET_VALIDITY';
export const FORM_SUBMIT = 'FORM_SUBMIT';
export const RESET_FORM_SUBMIT = 'RESET_FORM_SUBMIT';

const checkFormValidity = (inputs, name, validity) =>
  Object.keys(inputs).every((input) =>
    input !== name ? inputs[input]?.validity : validity
  );

export const formDataReducer = (state, action = {}) => {
  const { type, payload } = action;
  const { name, value, validity } = payload || {};
  const isFormValid = checkFormValidity(state.inputs, name, validity);

  switch (type) {
    case 'FORM_FIELD_CHANGE':
      const updatedState = {
        ...state,
        inputs: {
          ...state.inputs,
          [name]: {
            ...state.inputs?.[name],
            value: value,
            validity: validity ?? state.inputs?.[name]?.validity,
          },
        },
        isFormValid: isFormValid && validity,
      };
      return updatedState;
    case 'FORM_FIELD_SET_VALIDITY':
      const updatedValidityState = {
        ...state,
        inputs: {
          ...state.inputs,
          [name]: {
            ...state.inputs?.[name],
            validity: validity ?? state.inputs?.[name]?.validity,
          },
        },
        isFormValid: isFormValid && isValid,
      };
      return updatedValidityState;
    case 'FORM_SUBMIT':
      const submittedState = {
        ...state,
        isSubmitted: true,
        lastData: JSON.stringify(state.inputs),
      };
      return submittedState;
    case 'RESET_FORM_SUBMIT':
      return {
        ...state,
        isSubmitted: false,
      };
    default:
      return state;
  }
};