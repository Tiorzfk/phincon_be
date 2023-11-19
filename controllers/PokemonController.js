import {
    handleQuerySuccess,
    handleFail
} from '../utils/handleResponse.js';
import * as PokemonService from '../services/PokemonService.js';
import * as MyPokemonService from '../services/MyPokemonService.js';
import mongoose from "mongoose";

export async function download(ctx) {
    try {
        const {
            page,
            limit
        } = ctx.query
        
        var offset = (page-1) * limit

        var params = {
            limit: limit ?? 50,
            offset: page ? offset : 0
        }

        let data = await PokemonService.download(params)

        for (let i = 0; i < data.length; i++) {
            const findPokemon = await PokemonService.findOneByName(data[i].name)
            if(!findPokemon) {
                const detailPokemon = await PokemonService.downloadDetail(data[i].name)
                const dataSave = {
                    name: data[i].name,
                    detail: detailPokemon,
                    is_catched: 0
                }
                await PokemonService.savePokemon(dataSave)
            }
        }

        handleQuerySuccess(ctx, 'success', data)
    } catch (error) {
        console.log(error);
        handleFail(ctx, 500, 'Internal server error')
    }
}

export async function getList(ctx) {
    try {
        const {
            search,
            page,
            limit
        } = ctx.query
        const params = {
            search: search,
            page: page,
            limit: limit
        }
        let pokemons = await PokemonService.fetch(params)
        handleQuerySuccess(ctx, 'success', pokemons)
    } catch (error) {
        console.log(error);
        handleFail(ctx, 500, 'Internal server error')
    }
}

export async function getDetail(ctx) {
    try {
        const {
            id
        } = ctx.params
        let pokemon = await PokemonService.findOneById(id)
        handleQuerySuccess(ctx, 'success', pokemon)
    } catch (error) {
        console.log(error);
        handleFail(ctx, 500, 'Internal server error')
    }
}

export async function catchPokemon(ctx) {
    try {
        const {
            id,
        } = ctx.params

        await PokemonService.updatePokemon(id, {
            is_catched: 1
        })

        const body = {
            pokemon_id: new mongoose.Types.ObjectId(id),
            nickname: ctx.request.body.nickname
        }
        
        let pokemon = await MyPokemonService.saveMyPokemon(body)
        handleQuerySuccess(ctx, 'success', pokemon)
    } catch (error) {
        console.log(error);
        handleFail(ctx, 500, 'Internal server error')
    }
}

export async function updatePokemon(ctx) {
    try {
        const {
            id,
        } = ctx.params
        let pokemon = await PokemonService.updatePokemon(id, ctx.request.body)
        handleQuerySuccess(ctx, 'success', pokemon)
    } catch (error) {
        console.log(error);
        handleFail(ctx, 500, 'Internal server error')
    }
}