import Card from '../models/card.model.js'

export const checkValidCard = async (req, res) => {
    const { nombre, tipoTarjeta, nroTarjeta } = req.body
    if (!nombre || !tipoTarjeta || !nroTarjeta) return res.status(400).json({ message: 'Missing parameters' });

    let card;
    try {
        card = await Card.findOne({
            owner: nombre,
            card_number: +nroTarjeta,
            card_type_id: tipoTarjeta
        });
    } catch (err) {
        return res.status(500).json({ err })
    }
    if (!card) return res.status(404).json({ message: 'Card not found' })

    return res.status(200).json({message: 'OK'});
}
