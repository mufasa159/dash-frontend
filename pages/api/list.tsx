export default async (req:any, res:any) => {
    const token = process.env.upstashToken;
    const url = process.env.upstashUrl + "/lrange/todo/0/100?_token=" + token;

    return fetch(url)
        .then(r => r.json())
        .then(data => {
            let result = JSON.stringify(data.result)
            return res.status(200).json(result)
        })
}