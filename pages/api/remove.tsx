export default async (req:any, res:any) => {
    if(!req.query.todo) {
        return res.status(400).send("todo parameter required.")
    }
    let todo = encodeURI(req.query.todo)

    const token = process.env.upstashToken;
    const url = process.env.upstashUrl + "/lrem/todo/1/" + todo + "?_token=" + token;

    return fetch(url)
        .then(r => r.json())
        .then(data => {
            let result = JSON.stringify(data.result)
            return res.status(200).json(result)
        })
}