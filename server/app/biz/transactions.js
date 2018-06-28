let transaction = require('../../blockchain/index')
let batcher = require('../../blockchain/batcher')

module.exports.submit = {
    method: 'post',
    middlewares: [
        async (req, res, next) => {
            // console.log(req.txnBytes) 
            let transactionRes = await transaction.submit(req.body,req.query)
            // console.log(transactionRes)
            // req.$session.clearUser()
            res.$locals.writeData({
                user: '1111111111'
            })
            next()
        }
    ]
}

module.exports.info = {
    method: 'get',
    middlewares: [
        (req, res, next) => {
            let response =  {
                pubkey: batcher.getPublicKey(),
            }
            res.$locals.writeData(response)
            next()
        }
    ]
}