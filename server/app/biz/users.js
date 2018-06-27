module.exports.list = {
    method: 'get',
    middlewares: [
        (req, res, next) => {
            // req.$session.clearUser()
            res.$locals.writeData({
                user: '1111111111'
            })
            next()
        }
    ]
}