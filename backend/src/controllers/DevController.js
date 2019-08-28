const axios = require('axios'); // axios é uma biblioteca geralmente eh utilizada para conectar uma API externa
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {
        const { user } = req.headers; // req.headers está retornando o Object_id e.g 5d4add8bf2c7a3356007eee4 (id do usuario)

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },                 // usuario que não esteja logado ou seja com o req.header não preenchido
                { _id: { $nin: loggedDev.likes } },     // usuario que não deu likes
                { _id: { $nin: loggedDev.dislikes } },  // usuario que não deu dislikes
            ],
        })

        return res.json(users);

    },
    async store(req, res) {
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });

        if (userExists) {
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);
        console.log(username);
        console.log(response.data);

        const { name, bio, avatar_url: avatar } = response.data;

        await Dev.create({ // Salvando os dados no mongodb (Usando o mongodb remoto AWS)
            name, 
            user: username,
            bio,
            avatar
        })
        return res.json(Dev);
    }
}