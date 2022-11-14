import { create } from "../configs/db.config.js"

export const validationAndMake = async (req, res) => {
    const {nombre, email, id, monto, mdPago, nroTarjeta, expMonth, expYear, cv, franquicia, nroCuotas} = req.body
    if (!nombre || !email || !id || !monto || ! mdPago || !nroTarjeta || !expMonth || !expYear || !cv || !franquicia || !nroCuotas) {
        return res.status(400).json({ message: 'Missing parameters' });
    }
    try {
        if (monto <= 0) return res.status(400).json({ message: 'Amount must be greater than 0' });
        let query = create.query('SELECT * FROM Card JOIN Owner ON Card.owner_id = Owner.id_owner AND Owner.name = ? AND Owner.email = ? AND Owner.DNI = ? AND Card.card_number = ?',
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
        return res.status(200).json({message: 'Succesful transaction'})
    } catch(err){
        return res.status(500).json({err})
    }
}

export const ungetaleatorio = async (req, res) => {
    //const vara = await create.query('SELECT * FROM Card')
    //return res.status(200).json(vara)
    const resu = select()
    return res.status(200).json({resu})
}

const select = () => {
    const query = 'SELECT * FROM Card'
    create.query( query ,(err, rows) => {
        if(err) throw err
        console.log(rows)
})}