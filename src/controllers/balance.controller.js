import Card from '../models/card.model.js'
import Owner from '../models/owner.model.js'

export const checkingBalance = async (req, res) => {
    const {nombre, id, nroTarjetas} = req.body
    if (!nombre || !id || !nroTarjetas) return res.status(400).json({ message: 'Missing parameters' });
    
    try {
        let saldos = await Card.find({$or: nroTarjetas.map(i => ({
            card_number:i
        }))}, "amount")
        saldos = saldos.map(i => i.amount)
        return res.status(200).json({message: 'OK', saldos})
    } catch(err){
        return res.status(500).json({err})
    }
}