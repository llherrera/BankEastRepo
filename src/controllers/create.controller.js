import Card from '../models/card.model.js'
import Owner from '../models/owner.model.js'

let gen=1116
export const createUserBank = async (req, res) => {
    const {name, email, DNI} = req.body
    if (!name || !email || !DNI) return res.status(400).json({ message: 'Missing parameters' })
    try {
        await Owner.create({
            id_owner:gen.toString(),
            name,
            email,
            DNI
        })
        gen++
    return res.status(201).json()
  } catch (error) {
    return res.status(500).json({ error })
  }
}

let gencard=2114
export const createCard = async (req, res) => {
    const {owner, owner_id, exp_month, exp_year, cvv, amount, card_number, card_franchise_id, card_type_id} = req.body
    if (!owner || !owner_id || !exp_month || !exp_year || !cvv || !amount || !card_number || !card_franchise_id || !card_type_id) return res.status(400).json({ message: 'Missing parameters' })
    try{
        await Card.create({
            id_card:gencard.toString(),
            owner,
            owner_id,
            exp_month,
            exp_year,
            cvv,
            amount,
            card_number,
            card_franchise_id,
            card_type_id
        })
        gencard++
        return res.status(201).json()
    }catch (error) {
        return res.status(500).json({ error })
    }
}