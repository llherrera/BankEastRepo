import Card from '../models/card.model.js'
import Owner from '../models/owner.model.js'

export const checkingBalance = async (req, res) => {
    const { nombre, id, nroTarjetas } = req.body
    if (!nombre || !id || !nroTarjetas) return res.status(400).json({ message: 'Missing parameters' });

    let owner,saldos;
    try {
        owner = await Owner.findOne({ DNI: id, name: nombre });
    } catch (err) {
        return res.status(500).json({ message: 'Error' });
    }
    if(!owner) return res.status(404).json({ message: 'Owner not found' });

    try {
        saldos = await Card.find({
            owner_id: owner.id_owner,
            $in: { card_number: nroTarjetas },
        }, 'amount card_number');
        // saldos = await Card.find({
        //     $and: [
        //         { $or: nroTarjetas.map(nroTarj => ({ card_number: nroTarj })) },
        //         { owner_id: owner.id_owner }
        //     ]
        // }, 'amount card_number');
    } catch (err) {
        return res.status(500).json({ err })
    }
    if (nroTarjetas.length != saldos.length) return res.status(400).json({ message: 'Error' })

    return res.status(200).json({
        message: 'OK',
        saldos: saldos.map(({amount, card_number}) => ({ amount, card_number }))
    });
}

export const checkCardBalance = async (req, res) => {
    const { nombre, id, nroTarjeta } = req.body;
    if (!nombre || !id || !nroTarjeta) return res.status(400).json({ message: 'Missing parameters' });

    let owner, card;
    try {
        owner = await Owner.findOne({ DNI: id, name: nombre });
        card = await Card.findOne({ card_number: nroTarjeta, owner_id: owner.id_owner });
    } catch (err) {
        return res.status(500).json({ message: 'Error' });
    }
    if(!owner) return res.status(404).json({ message: 'Owner not found' });
    if(!card) return res.status(404).json({ message: 'Card not found' });

    return res.status(200).json({
        message: 'OK',
        saldo: card.amount
    });
}
