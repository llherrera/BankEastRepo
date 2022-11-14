import Card from '../models/card.model.js';
import Owner from '../models/owner.model.js';
import Type from '../models/type.model.js';
import franchise from '../models/franchise.model.js';
import * as bcrypt from '../utils/bcrypt.utils.js'

export const validationAndMake = async (req, res) => {
    const {nombre, email, id, monto, mdPago, nroTarjeta, expMonth, expYear, cv, franquicia, nroCuotas} = req.body
    if (!nombre || !email || !id || !monto || ! mdPago || !nroTarjeta || !expMonth || !expYear || !cv || !franquicia || !nroCuotas) {
        return res.status(400).json({ message: 'Missing parameters' });
    }
    if (monto <= 0) return res.status(400).json({ message: 'Amount must be greater than 0' });
    try {
        const card = await Card.findOne({card_number: {$eq: nroTarjeta}})
        if (card === null) return res.status(400).json({message:'Card do not exits'})
        const owner = await Owner.findOne({DNI: {$eq: id}})
        if (owner === null) return res.status(400).json({message: 'User do not exits'})
        if (owner.name != nombre || owner.email != email ) return res.status(400).json({message: 'User do not have this card'})
        if (card.owner != nombre) return res.status(400).json({message: 'User do not have this card'})
        if (card.card_type_id != mdPago || card.card_franchise_id != franquicia) return res.status(400).json({message: 'Bad type or franchise'})
        if (card.exp_month != expMonth || card.exp_year != expYear || card.cvv != cv) return res.status(400).json({message: 'Wrong parameters'})
        let discont
        if (mdPago == 1) discont = nroCuotas
        else discont = 1
        const valor = monto/discont
        if (card.amount < valor) return res.status(400).json({message: 'Insufficient balance'})
        console.log(card.amount)
        card.amount = card.amount - parseInt(valor)
        await card.save()
        return res.status(200).json(card)
        //return res.status(200).json({message: 'Succesful'})
        
        
        /*let query = create.query('SELECT * FROM Card JOIN Owner ON Card.owner_id = Owner.id_owner AND Owner.name = ? AND Owner.email = ? AND Owner.DNI = ? AND Card.card_number = ?',
                                    [nombre, email, id, nroTarjeta], (err) => { if (err) return res.status(500).json(err)})
        console.log(query)
        if (query.length > 1 || query.length > 1) return res.status(400).json({message: 'Card do not exits'})
        const {exp_month, exp_year, cvv, card_type, mount} = query[0]
        //card_type = 1 es credito, y 2 es debito
        if (card_type != 1 || card_type != 2) return res.status(400).json({message: 'Invalid card type'})
        let discont//para cuotas
        if (card_type == 1) discont = monto
        else if (card_type == 2) discont = 1 //las debito no manejan cuotas
        if (monto - (monto/discont) > mount) return res.status(400).json({message: 'Insufficient balance'})
        const newBalance = mount - (monto/discont)
        if (expMonth != exp_month || expYear != exp_year || cv != cvv) return res.status(400).json({message: 'Wrong parameters'})
        create.query('UPDATE Card SET mount = ? WHERE card_number = ?', [newBalance, nroTarjeta], (err) => { if (err) return res.status(500).json(err)})
        return res.status(200).json({message: 'Succesful transaction'})*/
    } catch(err){
        return res.status(500).json({err})
    }
}
/*
export const fetchlikesPost = async (req, res) => {
  const {user_id} = req.query;
  if (!user_id) return res.status(400).json({ message: "Missing user_id" });
  try {
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const posts = await Post.find({ _id: { $in: user.postsLiked }});
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(404).json({ message: "Missing ..." });
  }
};
*/



export const ungetaleatorio = async (req, res) => {
    try {
        const cards = await Card.find()
        return res.status(200).json(cards)
    } catch (err) {
        return res.status(500).json({err})
    }
}
