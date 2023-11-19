import mongoose from 'mongoose'; 

const Schema = mongoose.Schema; 

const MyPokemonsSchema = new Schema({ 
    pokemon_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pokemons'
    }, 
    nickname: String,
    renamed: { type: Number, default: 0 }
}, {timestamps: true}); 

export default mongoose.model('MyPokemons', MyPokemonsSchema);