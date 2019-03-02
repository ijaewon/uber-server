import dotenv from 'dotenv';
dotenv.config(); //env파일에서의 설정값들을 node에 로드해 줌.

import { Options } from "graphql-yoga";
import app from "./app";
import { createConnection } from "typeorm";
import connectionOptions from "./ormConfig";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT
};

const handleAppStart = () => console.log(`Listening on port ${PORT}`);

//먼저 ormConfig를 연결해 준 다음 app을 스타트한다.
createConnection(connectionOptions)
.then(() => {
    app.start(appOptions, handleAppStart);
})
.catch(error => console.log(error));