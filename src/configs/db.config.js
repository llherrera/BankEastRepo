import mysql from 'mysql';
import {DB_HOST, DB_NAME, DB_PASS, DB_USER, DB_PORT} from './index.js'

export const create = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    port: DB_PORT,
    password: DB_PASS,
    database: DB_NAME
})
