import CardWestern from '../models/card.model.js'
import Owner from '../models/owner.model.js'

export const checkingBalance = async (req, res) => {
    const {nombre, email, id, nroTarjeta} = req.body
    if (!nombre || !email || !id || !nroTarjeta) return res.status(400).json({ message: 'Missing parameters' });
    
    try {
        const card = await CardWestern.findOne({card_number: {$eq: nroTarjeta}})
        if (card === null) return res.status(400).json({message:'Card do not exits'})
        const owner = await Owner.findOne({DNI: {$eq: id}})
        if (owner === null) return res.status(400).json({message: 'User do not exits'})
        if (owner.name != nombre || owner.email != email ) return res.status(400).json({message: 'User do not have this card'})
        if (card.owner != nombre) return res.status(400).json({message: 'User do not have this card'})
        
        return res.status(200).json({message: 'Succesful'})
    } catch(err){
        return res.status(500).json({err})
    }
}