import MyPokemons from '../models/MyPokemons.js'; 
import mongoose from "mongoose";

export function fetch(params) {
    return new Promise((resolve, reject) => {
        const skip = (params.page - 1) * params.limit
        var findStr = {}

        if(params.search)
        {
            findStr = {$text: {$search: params.search??false}}
        }

        MyPokemons.aggregate([
            {
                $lookup: {
                    localField: "pokemon_id",
                    from: "pokemons",
                    foreignField: "_id",
                    as: "pokemons"
                }
            },
            {$unwind: '$pokemons'},
            // {$replaceRoot: {newRoot: '$pokemons'}},
            {$project: {'nickname': 1, 'renamed': 1, 'pokemons.name': 1, 'pokemons._id': 1, 'pokemons.detail.moves': {"$slice" : ["$pokemons.detail.moves", 0, 3]}, 'pokemons.detail.types': 1, 'pokemons.detail.sprites.front_shiny': 1}}
        ]).then(function (response) {
                var data = response

                const resp = data.map((d) => {
                    d.pokemons.renamed = d.renamed
                    d.pokemons.nickname = d.nickname
                    return d.pokemons
                })

                resolve(resp);
            })
            .catch(function (error) {
                reject(error)
            })
    })
    
}

export function findOneById (id) {
    return new Promise((resolve, reject) => {
        MyPokemons.findOne({_id: id}) 
            .then(function (response) {
                var data = response
                resolve(data);
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

export function findOneByPokemonId (id) {
    return new Promise((resolve, reject) => {
        MyPokemons.findOne({pokemon_id: id}) 
            .then(function (response) {
                var data = response
                resolve(data);
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

export function findOneByName (name) {
    return new Promise((resolve, reject) => {
        MyPokemons.findOne({name: name}) 
            .then(function (response) {
                var data = response
                resolve(data);
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

export function saveMyPokemon (pokemon) {
    return new Promise((resolve, reject) => {
        var data = new MyPokemons(pokemon)

        data.save()
            .then(function (response) {
                var data = response.data
                resolve(data);
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

export function deleteMyPokemon (id) {
    return new Promise(async (resolve, reject) => {
        MyPokemons.deleteOne({pokemon_id: new mongoose.Types.ObjectId(id)})
            .then(function (response) {
                var data = response.data
                resolve(data);
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

export function updatePokemon (id, update) {
    return new Promise((resolve, reject) => {
        MyPokemons.findOneAndUpdate({pokemon_id: id}, update)
            .then(function (response) {
                var data = response.data
                resolve(data);
            })
            .catch(function (error) {
                reject(error)
            })
    })
}