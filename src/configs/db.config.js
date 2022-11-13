import mysql from 'mysql';
import {DB_HOST, DB_NAME, DB_PASS, DB_USER, DB_PORT} from './index.js'

export const create = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    port: DB_PORT,
    password: DB_PASS,
    database: DB_NAME
})

export const connect = () => {
    create.connect( (err) => {
        if(err) throw err
        console.log('Connected to DB')
})}
/*
const select = () => {
    const query = 'SELECT * FROM banco'
    create.query( query ,(err, rows) => {
        if(err) throw err
        console.log(rows)
})}

const giveuser = () => {
    const query = 'SELECT * FROM bankusers WHERE (Id_Bank = 2)'
    create.query( query ,(err, rows) => {
        if(err) throw err
        console.log(rows)
})}
*/
//export {connect, select, giveuser}