import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {PokemonEntity} from './pokemon.entity';
import {PokemonDto} from './pokemon.dto';

@Injectable()
export class PokemonService extends TypeOrmCrudService<PokemonEntity> {
    constructor(@InjectRepository(PokemonEntity) repo) {
        super(repo);
    }

    async save(data: PokemonDto) {
        return await this.repo.save(data);
    }
}
