import {EntityRepository, Repository} from 'typeorm';
import {PokemonEntity} from './pokemon.entity';
import {PokemonDto} from './pokemon.dto';

@EntityRepository(PokemonEntity)
export class PokemonRepository extends Repository<PokemonEntity> {
    async createPokemon(pokemonDto: PokemonDto) {
        return await this.save(pokemonDto);
    }

    async findOnePokemon(uuid: number) {
        return this.findOneOrFail(uuid);
    }

    async updatePokemon(uuid: number, pokemonDto: PokemonDto) {
        return this.save({...pokemonDto, uuid});
    }

    async removePokemon(uuid: number) {
        await this.findOneOrFail(uuid);
        return this.delete(uuid);
    }
}
