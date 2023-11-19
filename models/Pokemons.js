import mongoose from 'mongoose'; 

const Schema = mongoose.Schema; 

const PokemonSchema = new Schema({ 
    name: String, 
    detail: Object, 
    is_catched: Number,
    nickname: String
}, {timestamps: true}); 

// PokemonSchema.index({name: 'text', 'profile.something': 'text'});
PokemonSchema.index({'$**': 'text'});

export default mongoose.model('Pokemons', PokemonSchema);