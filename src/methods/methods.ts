import { sayHello, sayHelloParser } from "./sayHello";

export const methods: any = {
  sayHello: {
    method: sayHello,
    parser: sayHelloParser,
    params: true,
  },
  sayWhat: {
    method: () => ({ msg: "What" }),
    params: false,
  },
};
