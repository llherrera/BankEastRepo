import Card from '../models/card.model.js'

export const checkingBalance = async (req, res) => {
    const { tarjetas } = req.body
    if (!tarjetas) return res.status(400).json({ message: 'Missing parameters' });

    let cards;
    try {
        cards = await Card.find({
            card_number: { $in: tarjetas.map(tarjeta => +tarjeta.numero) },
        }).select('amount owner card_number card_type_id');
    } catch (err) {
        return res.status(500).json({ err })
    }
    if (tarjetas.length !== cards.length) return res.status(400).json({
        message: `Error: ${tarjetas.length - cards.length} tarjetas solicitadas no encontradas`
    })

    const ok = tarjetas.every(tarjeta => {
        const card = cards.find(card => card.card_number == +tarjeta.numero);
        if (!card) return false;
        return tarjeta.owner == card.owner && tarjeta.tipo == card.card_type_id;
    })

    if (!ok) return res.status(400).json({ message: 'Error: tarjetas no coinciden' });

    return res.status(200).json({
        message: 'OK',
        saldos: cards.map(({ amount, card_number }) => ({ amount, card_number }))
    });
}
