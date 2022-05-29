import {IsNotEmpty} from "class-validator";

export class CreateBlogDto{

    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    content: string;
}

export class BlogDto{

    id: Number;

    author: String;

    content: String;
}