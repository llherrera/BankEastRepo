import Card from '../models/card.model.js'
import Owner from '../models/owner.model.js'

export const checkCardExists = async (req, res) => {
    const { nombre, id, nroTarjeta } = req.body
    if (!nombre || !id || !nroTarjeta) return res.status(400).json({ message: 'Missing parameters' });

    let owner, card;
    try {
        owner = await Owner.findOne({ DNI: id, name: nombre });
    } catch (err) {
        return res.status(500).json({ message: 'Error' });
    }
    if (!owner) return res.status(404).json({ message: 'Owner not found' });

    try {
        card = await Card.findOne({
            owner_id: owner.id_owner,
            card_number: nroTarjeta,
        });
    } catch (err) {
        return res.status(500).json({ err })
    }

    if (!card) return res.status(404).json({ message: 'Card not found' })

    return res.status(200).json({message: 'OK'});
}
