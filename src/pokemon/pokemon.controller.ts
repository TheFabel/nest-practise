import {Body, Controller, Get, Logger, Param, Patch, Post, Put} from '@nestjs/common';
import {PokemonService} from './pokemon.service';
import {PokemonEntity} from './pokemon.entity';
import {PokemonDto} from './pokemon.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {PokemonRepository} from './pokemon.repository';

@Controller('pokemon')
export class PokemonController {
    constructor(
        public pokemonService: PokemonService,
        @InjectRepository(PokemonRepository) private readonly pokemonRepository: PokemonRepository,
    ) {
    }

    @Post()
    create(@Body() pokemonDto: PokemonDto): Promise<PokemonEntity> {
        return this.pokemonRepository.save(pokemonDto);
    }

    @Get()
    findAll(): Promise<PokemonEntity[]> {
        return this.pokemonRepository.find();
    }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: number) {
        return this.pokemonRepository.findOnePokemon(uuid);
    }

    @Put(':uuid')
    async update(@Param('uuid') uuid: number, @Body() pokemonDto: PokemonDto): Promise<PokemonEntity | {error: boolean, message: string}> {
        const pokemon = await this.pokemonRepository.findOnePokemon(uuid);
        try {
            return await this.pokemonRepository.save({...pokemon, ...pokemonDto});
        } catch (e) {
            Logger.error('Error while updating pokemon', e.message);
            return {error: true, message: 'Error'};
        }
    }

}
