import {
    Body,
    Controller,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query,
    Redirect,
    Req,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import {Observable, of} from "rxjs";
import {CatDTO} from "./DTO/CatDTO";
import {CatsService} from "./cats.service";
import {Cat} from "./interfaces/Cat";

@Controller('cats')
export class CatsController {

    constructor(private catsService: CatsService) {}

    @Get()
    findAll(@Req() request: Request) {
        return this.catsService.findAll();
    }

    @Get('findAllAsync')
    async findAllAsync(): Promise<Cat[]> {
        return this.catsService.findAll();
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
    @UsePipes(new ValidationPipe({
        transform: true,
        whitelist: true,
    }))
    async createAsync(@Body() catDTO: CatDTO) {
        this.catsService.create(catDTO);
        return `This action adds a new cat: ${JSON.stringify(catDTO)}`;
    }
}