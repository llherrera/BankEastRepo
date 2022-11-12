import { create } from "../configs/db.config.js"
import mysql from 'mysql';

export const validationAndMake = async (req, res) => {
    const {nombre, monto, mdPago, nroTarjeta, franquicia} = req.query
    let query
    let tabla
    if (mdPago === 'Credito') tabla='creditcards'
    else if (mdPago === 'Debito') tabla = 'debitcard'
    else return res.json('Aqui no hay nah')
    query = mysql.format('SELECT * FROM '+tabla+' WHERE Number = ? AND Owner = ? AND Franchise = ?', [nroTarjeta, nombre, franquicia])
    create.query( query ,(err, rows) => {
        if(err) throw err
        if(rows.length > 0){
            if (rows[0].Balance >= monto) {
                const newBalance = rows[0].Balance - monto
                create.query('UPDATE '+tabla+' SET Balance = ? WHERE Number = ? AND Owner = ? AND Franchise = ?', [newBalance, nroTarjeta, nombre, franquicia])
                return res.status(200).json("Transaccion valida")
            }else{
                return res.status(400).json("Saldo insufuciente")
            }
        }else{
            return res.status(400).json("Tarjeta no encontrada")
        }
    })
}