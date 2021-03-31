
async function post(req, res, next) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, go back and fill all the fields!')
        }
    }

    if (!req.files || req.files.length == 0)
        return res.send('Please, send at least one image!')

    next()
}

async function put(req, res, next) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "" && key != "removed_files" && key != "old_price") {
            return res.send('Please, fill all the fields!')
        }
    }

    next()
}

module.exports = {
    post,
    put
}