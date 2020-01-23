import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {PokemonService} from './pokemon.service';
import {PokemonController} from './pokemon.controller';
import {PokemonEntity} from './pokemon.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PokemonRepository} from './pokemon.repository';
import {LoggerMiddleware} from '../middleware/logger.middleware';

@Module({
    imports: [TypeOrmModule.forFeature([PokemonEntity, PokemonRepository])],
    controllers: [PokemonController],
    providers: [PokemonService],
})
export class PokemonModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware)
            .forRoutes(PokemonController);
    }
}
