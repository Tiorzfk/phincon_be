import axios from 'axios';
import Pokemon from '../models/Pokemons.js'; 
import MyPokemon from '../models/MyPokemons.js'; 

export function download(params) {
    return new Promise((resolve, reject) => {
        axios.get(`${process.env.POKEMON_API}/pokemon`, { params })
            .then(function (response) {
                var data = response.data.results

                resolve(data);
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

export function downloadDetail(name) {
    return new Promise((resolve, reject) => {
        axios.get(`${process.env.POKEMON_API}/pokemon/${name}`)
            .then(function (response) {
                var data = response.data

                resolve(data);
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

export function fetch(params) {
    return new Promise((resolve, reject) => {
        const skip = (params.page - 1) * params.limit
        var findStr = {
            $or: [{is_catched: 0}, {is_catched: 2}]
        }

        if(params.search)
        {
            findStr = {$text: {$search: params.search??false}}
        }
        
        Pokemon.find(findStr, 
            {'name': 1, 'detail.moves': {"$slice" : 3}, 'detail.types': 1, 'detail.sprites.front_shiny': 1}, 
            { skip: skip, limit: params.limit })
            .then(function (response) {
                var data = response
                resolve(data);
            })
            .catch(function (error) {
                reject(error)
            })
    })
    
}

export function findOneById (id) {
    return new Promise((resolve, reject) => {
        Pokemon.findOne({_id: id}) 
            .then(async function (response) {
                var data = response

                var my = await MyPokemon.findOne({pokemon_id: data._id})
                if(data && my)
                {
                    data.nickname = my.nickname
                }
                
                resolve(data);
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

export function findOneByName (name) {
    return new Promise((resolve, reject) => {
        Pokemon.findOne({name: name}) 
            .then(function (response) {
                var data = response
                resolve(data);
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

export function savePokemon (pokemon) {
    return new Promise((resolve, reject) => {
        var data = new Pokemon(pokemon)

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

export function updatePokemon (id, update) {
    return new Promise((resolve, reject) => {
        Pokemon.findOneAndUpdate({_id: id}, update)
            .then(function (response) {
                var data = response.data
                resolve(data);
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

