import z from "zod";

export function sayHello({ name }: { name: string }) {
  return { greet: `Hello ${name}` };
}

const nameParser = z.string().min(1).max(24);

export const sayHelloParser = z
  .union([z.object({ name: nameParser }), z.tuple([nameParser])])
  .transform((val) => {
    if (Array.isArray(val)) {
      return { name: val[0] };
    }
    return val;
  });
