import { v4 as uuid } from "uuid";

export const products = [
  {
    id: uuid(),
    address: {
      country: "USA",
      state: "Bristow",
      city: "Iowa",
      street: "1865  Pleasant Hill Road",
    },
    avatarUrl: "/static/images/avatars/avatar_4.png",
    createdAt: 1555016400000,
    email: "cao.yu@devias.io",
    name: "molka",
    phone: "712-351-5711",
  },
  {
    id: uuid(),
    address: {
      country: "USA",
      state: "Georgia",
      city: "Atlanta",
      street: "4894  Lakeland Park Drive",
    },
    avatarUrl: "/static/images/avatars/avatar_2.png",
    createdAt: 1555016400000,
    email: "alexa.richardson@devias.io",
    name: "riadh",
    phone: "770-635-2682",
  },
  {
    id: uuid(),
    address: {
      country: "USA",
      state: "Ohio",
      city: "Dover",
      street: "4158  Hedge Street",
    },
    avatarUrl: "/static/images/avatars/avatar_5.png",
    createdAt: 1554930000000,
    email: "anje.keizer@devias.io",
    name: "totototo",
    phone: "908-691-3242",
  },
  {
    id: uuid(),
    address: {
      country: "USA",
      state: "Texas",
      city: "Dallas",
      street: "75247",
    },
    avatarUrl: "/static/images/avatars/avatar_6.png",
    createdAt: 1554757200000,
    email: "clarke.gillebert@devias.io",
    name: "Clarke Gillebert",
    phone: "972-333-4106",
  },

  {
    id: uuid(),
    address: {
      country: "USA",
      state: "California",
      city: "Redondo Beach",
      street: "2188  Armbrester Drive",
    },
    avatarUrl: "/static/images/avatars/avatar_7.png",
    createdAt: 1554325200000,
    email: "ava.gregoraci@devias.io",
    name: "Ava Gregoraci",
    phone: "415-907-2647",
  },
];
