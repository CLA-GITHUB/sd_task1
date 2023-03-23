import * as pg from "pg";
import mysql from "mysql2";

export const pool = mysql
  .createPool({
    host: "containers-us-west-90.railway.app",
    user: "root",
    password: "Of8COFtzcP4F3vx1D9Ks",
    database: "railway",
    port: 5443,
  })
  .promise();
