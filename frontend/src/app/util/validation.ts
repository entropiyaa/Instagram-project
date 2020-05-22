export const validation = {
  email: {
    minlength: 6,
    maxlength: 30,
    pattern: '[a-zA-Z0-9._]+@[a-zA-Z]+.[a-z]{2,6}'
  },
  password: {
    minlength: 8,
    maxlength: 20,
    pattern: '(?=.*[:.,/!?+%]).{8,20}'
  }
};
