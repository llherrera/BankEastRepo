import Card from '../models/card.model.js'
import Owner from '../models/owner.model.js'
import Deal from '../models/deal.model.js'
import * as bcrypt from '../utils/bcrypt.utils.js'

export const validationAndMake = async (req, res) => {
    const { nombre, email, id, monto, mdPago, nroTarjeta, expMonth, expYear, cv, franquicia,
        nroCuotas, nroReferencia } = req.body

    // create minimal data response
    const data = {
        'reference_number': nroReferencia,
        'amount': monto,
        'balance': monto / (mdPago == 1 ? nroCuotas : 1),
        'successful': false,
        'fulfilled': false,
        'dues_number': nroCuotas,
        'effective_date': new Date().toISOString()
    };
    
    // basic validations
    if (!nombre || !email || !id || !monto || !mdPago || !nroTarjeta || !expMonth || !expYear || !cv
            || !franquicia || !nroCuotas || !nroReferencia) {
        
        return res.status(400).json({
            message: 'Error', reason: 'Data received was not enough to process transaction', data
        })
    }
    if (monto < 1) return res.status(400).json({
        message: 'Error', reason: 'Amount must be greater than zero', data
    })
    if (nroCuotas < 1) return res.status(400).json({
        message: 'Error', reason: 'Dues must be greater than zero', data
    })

    // check if transaction with given ref_number was already processed before
    let tran;
    try {
        tran = await Deal.findOne({ reference_number: nroReferencia })
    } catch (err) {
        return res.status(500).json({ message: 'Error', reason: 'Internal server error', data });
    }
    if (tran) return res.status(400).json({
        message: 'OK',
        reason: 'Transaction already processed',
        data: { ...tran._doc, effective_date: tran.effective_date.toISOString() }
    })

    try {
        const deal = await Deal.create({ ...data, effective_date: new Date() });

        const card = await Card.findOne({ card_number: nroTarjeta })
        if (!card) return res.status(400).json({
            message: 'Error', reason: 'Card does not exist in database', data
        })

        const owner = await Owner.findOne({ DNI: id })
        if (!owner) {
            return res.status(400).json({
                message: 'Error', reason: 'Person with this document number does not exist in database', data
            })
        }
        if (owner.name !== nombre || owner.email !== email) {
            return res.status(400).json({
                message: 'Error', reason: 'Person name or email doesn\'t match', data
            })
        }
        if (card.owner !== nombre) {
            return res.status(400).json({
                message: 'Error', reason: 'Person does not own this card', data
            })
        }
        if (card.card_type_id !== +mdPago || card.card_franchise_id !== +franquicia) {
            return res.status(400).json({ message: 'Error', reason: 'Bad type or franchise', data })
        }
        if (!bcrypt.confirmPassword(card.exp_month, expMonth) || 
            !bcrypt.confirmPassword(card.exp_year, expYear) || !bcrypt.confirmPassword(card.cvv, cv)) {
            
            return res.status(401).json({ message: 'Error', reason: 'Card authentication failed', data })
        }
        if (card.amount < deal.balance) {
            return res.status(400).json({ message: 'Error', reason: 'Insufficient balance', data })
        }

        const cardUni = await Card.findOne({owner: {$eq: "Universidad"}})

        card.amount = card.amount - parseInt(deal.balance)
        cardUni.amount = cardUni.amount + monto
        await card.save(), cardUni.save()

        deal.successful = true;
        if (deal.amount === deal.balance) deal.fulfilled = true;
        await deal.save();

        return res.status(200).json({ message: 'OK', reason: 'Transaccion successful', data: deal })
    } catch (err) {
        return res.status(500).json({ message: 'Error', reason: 'Internal bank error', data })
    }
}
