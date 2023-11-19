import {
    handleQuerySuccess,
    handleFail
} from '../utils/handleResponse.js';
import {
    isPrimeNumber,
    randomIntFromInterval
} from '../utils/helper.js';
import * as MyPokemonService from '../services/MyPokemonService.js';
import * as PokemonService from '../services/PokemonService.js';

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
        let pokemons = await MyPokemonService.fetch(params)
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
        let pokemon = await MyPokemonService.findOneById(id)
        handleQuerySuccess(ctx, 'success', pokemon)
    } catch (error) {
        console.log(error);
        handleFail(ctx, 500, 'Internal server error')
    }
}

export async function releasePokemon(ctx) {
    try {
        const {
            id
        } = ctx.params

        const random = randomIntFromInterval(1, 100)
        const checkPrimeNumber = isPrimeNumber(random)

        if(checkPrimeNumber)
        {
            await PokemonService.updatePokemon(id, {
                is_catched: 0
            })

            await MyPokemonService.deleteMyPokemon(id)

            handleQuerySuccess(ctx, 'success', [])
        }else{
            handleFail(ctx, 400, `Failed release pokemon because number not prime, your number is ${random}, please try again !`)
        }
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

        var body = await MyPokemonService.findOneByPokemonId(id)
        console.log(body);
        body.renamed = body.renamed + 1
        body.nickname = ctx.request.body.nickname

        let pokemon = await MyPokemonService.updatePokemon(id, body)
        handleQuerySuccess(ctx, 'success', pokemon)
    } catch (error) {
        console.log(error);
        handleFail(ctx, 500, 'Internal server error')
    }
}