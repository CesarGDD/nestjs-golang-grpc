import { OnModuleInit } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Subscription } from "@nestjs/graphql";
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Blog, CreateBlogRequest, CreateBlogResponse, DeleteBlogRequest, DeleteBlogResponse, GetBlogRequest, GetBlogResponse, GetBlogsRequest, GetBlogsResponse, UpdateBlogRequest, UpdateBlogResponse } from "blogpb/blogpb";
import { PubSub } from 'graphql-subscriptions';
import { firstValueFrom, Observable } from 'rxjs';
import { grpcClient } from './blog.client';
import { NewBlog, UpdateBlog } from './graphql';

interface BlogsService {
    createBlog(request: CreateBlogRequest): Observable<CreateBlogResponse>;
    updateBlog(request: UpdateBlogRequest): Observable<UpdateBlogResponse>;
    deleteBlog(request: DeleteBlogRequest): Observable<DeleteBlogResponse>;
    getBlog(request: GetBlogRequest): Observable<GetBlogResponse>;
    getBlogs(request: GetBlogsRequest): Observable<GetBlogsResponse>;
}

const pubSub = new PubSub();

@Resolver()
export class BlogResolver implements OnModuleInit{
    @Client(grpcClient)
    private readonly svc: ClientGrpc

    private blogService: BlogsService

    onModuleInit() {
        this.blogService = this.svc.getService<BlogsService>('BlogService')
    }


    @Query('getBlogs')
    async getBlogs(req):Promise<Blog[]>{
        const res = await this.blogService.getBlogs(req)
        const blog = (await firstValueFrom(res)).blog
        return blog
    }

    @Query('getBlog')
    async getBlog(
        @Args('id') id: number
    ):Promise<Blog>{
        const blog = await this.blogService.getBlog({id}).toPromise()
        return blog.blog
    }

    @Mutation('createBlog')
    async createBlog(
        @Args('input'){author, content}:NewBlog
    ):Promise<Blog>{
        const {blog} = await this.blogService.createBlog({author, content}).toPromise()
        pubSub.publish('blogAdded', {blogAdded: blog})
        return blog
    }

    @Subscription('blogAdded')
    blogAdded(){
       return pubSub.asyncIterator('blogAdded')
    }

    @Mutation('updateBlog')
    async updateBlog(
        @Args('input'){author, content, id}:UpdateBlog
    ):Promise<Blog>{
        const res = await this.blogService.updateBlog({blog: {author, content, id}}).toPromise()
        return res.blog
    }

    @Mutation('deleteBlog')
    async deleteBlog(
        @Args('id') id: number
    ):Promise<Blog>{
        const res = await this.blogService.deleteBlog({id})
        const blog = (await firstValueFrom(res)).blog
        console.log(blog)
        return blog
    }
}