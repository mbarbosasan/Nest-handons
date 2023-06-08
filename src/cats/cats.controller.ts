import {Body, Controller, Get, Header, HttpCode, Param, Post, Query, Redirect, Req} from "@nestjs/common";
import {Observable, of} from "rxjs";
import {CatDTO} from "./DTO/CatDTO";

@Controller('cats')
export class CatsController {

    @Get()
    findAll(@Req() request: Request): string {
        return 'This action returns all cats';
    }

    @Get()
    findAllAsync(): Observable<any[]> {
        return of([]);
    }

    @Get('redirectToNestJS')
    @Redirect('https://nestjs.com', 301)
    getDocs(@Query('version') version) {
        if (version) return { url: `https://docs.nestjs.com/v${version}` };
    }

    @Get(':id')
    findOne(@Param() params): string {
        console.log(params.id);
        return `This action returns a #${params.id} cat`;
    }

    @Post()
    @HttpCode(204)
    @Header('Cache-Control', 'none')
    create(): string {
        return 'This action adds a new cat';
    }

    @Post('createAsync')
    async createAsync(@Body() catDTO: CatDTO) {
        return `This action adds a new cat: ${catDTO.name} ${catDTO.age} ${catDTO.breed}`
    }
}