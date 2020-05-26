import {Validators} from "@angular/forms";

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
  },
  name: {
    minlength: 2,
    maxlength: 20,
    pattern: '[a-zA-Z]+'
  },
  text: {
    maxlength: 250
  },
  emailValid: [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(30),
    Validators.pattern( '[a-zA-Z0-9._]+@[a-zA-Z]+.[a-z]{2,6}')
  ],
  passwordValid: [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
    Validators.pattern('(?=.*[:.,/!?+%]).{8,20}')
  ],
  nameValid: [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(20),
    Validators.pattern('[a-zA-Z]+')
  ],
  textValid: [
    Validators.maxLength(250)
  ],
  digitsValid: [
    Validators.pattern('[0-9]+')
  ]
};
