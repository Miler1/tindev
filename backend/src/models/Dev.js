const { Schema, model } = require('mongoose');

// Schema é propriedade do objeto mongoose é equivalente a chamada mongoose.Schema()

const DevSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type:String,
        required: true,
    },
    likes: [{
        type: Schema.Types.ObjectId, // identificador
        ref: 'Dev', //campo que está sendo referenciado
    }],
    dislikes: [{
        type: Schema.Types.ObjectId, // identificador
        ref: 'Dev', //campo que está sendo referenciado
    }],
}, {
    timestamps: true,
});

module.exports = model('Dev', DevSchema);