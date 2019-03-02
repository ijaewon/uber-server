export const typeDefs = ["type Greeting {\n  ok: Boolean!\n  error: String!\n}\n\ntype Query {\n  sayBye: Greeting!\n  sayHello: String!\n}\n"];
/* tslint:disable */

export interface Query {
  sayBye: Greeting;
  sayHello: string;
}

export interface Greeting {
  ok: boolean;
  error: string;
}
