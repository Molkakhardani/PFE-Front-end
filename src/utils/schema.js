export const newAccountSchema = {
  firstName: {
    presence: { allowEmpty: false, message: "est obligatoire" },
    length: {
      maximum: 32,
    },
  },
  lastName: {
    presence: { allowEmpty: false, message: "est obligatoire" },
    length: {
      maximum: 32,
    },
  },
  email: {
    presence: { allowEmpty: false, message: "est obligatoire" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  phoneNumber: {
    presence: { allowEmpty: false, message: "est obligatoire" },
    length: {
      maximum: 32,
    },
  },
  account: {
    presence: { allowEmpty: false, message: "est obligatoire" },
    length: {
      maximum: 32,
    },
  },
  post: {
    presence: { allowEmpty: false, message: "est obligatoire" },
    length: {
      maximum: 32,
    },
  },
};

export const newVisitSchema = {
  firstName: {
    presence: { allowEmpty: false, message: "est obligatoire" },
    length: {
      maximum: 32,
    },
  },
  lastName: {
    presence: { allowEmpty: false, message: "est obligatoire" },
    length: {
      maximum: 32,
    },
  },
  email: {
    presence: { allowEmpty: false, message: "est obligatoire" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  phoneNumber: {
    presence: { allowEmpty: false, message: "est obligatoire" },
    length: {
      maximum: 32,
    },
  },
  title: {
    presence: { allowEmpty: false, message: "est obligatoire" },
    length: {
      maximum: 32,
    },
  },
  description: {
    presence: { allowEmpty: false, message: "est obligatoire" },
    length: {
      maximum: 200,
    },
  },
};
