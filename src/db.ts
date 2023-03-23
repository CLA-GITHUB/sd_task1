import * as pg from "pg";
import mysql from "mysql2";

export const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 5443,
  })
  .promise();
