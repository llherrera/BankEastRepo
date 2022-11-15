import Card from '../models/card.model.js'
import Owner from '../models/owner.model.js'
import Deal from '../models/deal.model.js'
import * as bcrypt from '../utils/bcrypt.utils.js';

export const validationAndMake = async (req, res) => {
    const {nombre, email, id, monto, mdPago, nroTarjeta, expMonth, expYear, cv, franquicia, nroCuotas, nroReferencia} = req.body
    if (!nombre || !email || !id || !monto || ! mdPago || !nroTarjeta || !expMonth || !expYear || !cv || !franquicia || !nroCuotas || !nroReferencia) {
        return res.status(400).json({ message: 'Missing parameters' })
    }
    if (monto < 1) return res.status(400).json({ message: 'Amount must be greater than 0' })
    if (nroCuotas < 1) return res.status(400).json({message: 'Dues must be greater than 0'})
    try {
        const tran = await Deal.findOne({reference_number: {$eq: nroReferencia}})
        if (tran != null) return res.status(400).json({message: 'Transaction in process'})
        await Deal.create({reference_number: nroReferencia})
        const card = await Card.findOne({card_number: {$eq: nroTarjeta}})
        if (card === null) return res.status(400).json({message:'Card do not exits'})
        const owner = await Owner.findOne({DNI: {$eq: id}})
        if (owner === null) return res.status(400).json({message: 'User do not exits'})
        if (owner.name != nombre || owner.email != email ) return res.status(400).json({message: 'User do not have this card'})
        if (card.owner != nombre) return res.status(400).json({message: 'User do not have this card'})
        if (card.card_type_id != mdPago || card.card_franchise_id != franquicia) return res.status(400).json({message: 'Bad type or franchise'})
        if (card.exp_month != expMonth || card.exp_year != expYear || card.cvv != cv) return res.status(400).json({message: 'Wrong parameters'})
        //if (!bcrypt.confirmPassword(expMonth, card.exp_month) || !bcrypt.confirmPassword(expYear, card.exp_year) || !bcrypt.confirmPassword(cv, card.cvv)) return res.status(401).json({ message: 'Wrong parameters' })
        let discont
        if (mdPago == 1) discont = nroCuotas
        else discont = 1
        const valor = monto/discont
        if (card.amount < valor) return res.status(400).json({message: 'Insufficient balance'})
        card.amount = card.amount - parseInt(valor)
        await card.save()
        return res.status(200).json({message: 'Succesful', nroReferencia})
    } catch(err){
        return res.status(500).json({err})
    }
}
