import Card from '../models/card.model.js'
import Owner from '../models/owner.model.js'

export const checkingBalance = async (req, res) => {
    const { nombre, id, nroTarjetas } = req.body
    if (!nombre || !id || !nroTarjetas) return res.status(400).json({ message: 'Missing parameters' });

    let owner, saldos;
    try {
        owner = await Owner.findOne({ DNI: id, name: nombre });
    } catch (err) {
        return res.status(500).json({ message: 'Error' });
    }
    if (!owner) return res.status(404).json({ message: 'Owner not found' });

    try {
        saldos = await Card.find({
            owner_id: owner.id_owner,
            $in: { card_number: nroTarjetas },
        }, 'amount card_number');
    } catch (err) {
        return res.status(500).json({ err })
    }
    if (nroTarjetas.length != saldos.length) return res.status(400).json({ message: 'Error' })

    return res.status(200).json({
        message: 'OK',
        saldos: saldos.map(({ amount, card_number }) => ({ amount, card_number }))
    });
}
