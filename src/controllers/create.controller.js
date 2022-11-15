import CardWestern from '../models/card.model.js'
import OwnerWestern from '../models/owner.model.js'

let gen=1116
export const createUserBank = async (req, res) => {
    const {name, email, DNI} = req.body
    if (!nombre || !email || !DNI) return res.status(400).json({ message: 'Missing parameters' })
    try {
        await OwnerWestern.create({
            id_owner:gen++,
            name,
            email,
            DNI
        })
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
        await CardWestern.create({
            id_card:gencard++,
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
        return res.status(201).json()
    }catch (error) {
        return res.status(500).json({ error })
    }
}