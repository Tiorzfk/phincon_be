import Router from 'koa-router';
import * as PokemonController from '../controllers/PokemonController.js';

const router = new Router({
	prefix: '/api/pokemons'
});

router.get('/download', PokemonController.download);
router.get('/', PokemonController.getList);
router.get('/:id', PokemonController.getDetail);
router.post('/:id/catch', PokemonController.catchPokemon);
router.put('/:id', PokemonController.updatePokemon);

export default router;