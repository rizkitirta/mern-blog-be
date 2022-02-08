exports.login = async (req,res) => {
    res.status(201).send(req.body)
    console.log(req.body)
}

exports.register = async (req,res) => {
    res.status(201).send(req.body)
}