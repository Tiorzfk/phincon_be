import Router from 'koa-router';
import * as MyPokemonController from '../controllers/MyPokemonController.js';

const router = new Router({
	prefix: '/api/my-pokemons'
});

router.get('/', MyPokemonController.getList);
router.get('/:id', MyPokemonController.getDetail);
router.put('/:id', MyPokemonController.updatePokemon);
router.post('/:id/release', MyPokemonController.releasePokemon);

export default router;