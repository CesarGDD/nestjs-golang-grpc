import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogRequest, CreateBlogResponse, DeleteBlogRequest, DeleteBlogResponse, GetBlogResponse, GetBlogsResponse, UpdateBlogRequest, UpdateBlogResponse } from 'blogpb/blogpb';
import { Repository } from 'typeorm'
import { CreateBlogDto } from './blog.dto';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>
    ){}

    async createBlog({author, content}: CreateBlogRequest):Promise<CreateBlogResponse> {
        const blog = new Blog()
        const res = await this.blogRepository.save({author, content})
        blog.id = res.id
        blog.author = res.author
        blog.content = res.content
        return {blog}
    }

    async updateBlog({blog: {author, content, id}}:UpdateBlogRequest):Promise<UpdateBlogResponse>{
        const blog = new Blog()
        await this.blogRepository.update(id, {author, content})
        const res = await this.blogRepository.findOne(id)
        blog.id = res.id
        blog.author = res.author
        blog.content = res.content
        return {blog}
    }

    async deleteBlog({id}:DeleteBlogRequest):Promise<DeleteBlogResponse>{
        await this.blogRepository.delete(id)
        const blog = new Blog()
        blog.id = 0
        blog.author = 'Deleted'
        blog.content = 'Success'
        console.log(blog)
        return {blog: blog}
    }

    async getBlog({id}):Promise<GetBlogResponse>{
        const blog =  new Blog()
        const res = await this.blogRepository.findOne(id)
        blog.id = res.id
        blog.author = res.author
        blog.content = res.content

        return {blog}

    }

    async getBlogs():Promise<GetBlogsResponse>{
        let blogs = new Array<Blog>()
        const res = await this.blogRepository.find()
        blogs = [...res]
        return {blog: blogs}
    }
}

