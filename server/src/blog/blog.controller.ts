import { BlogService } from './blog.service';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Blog } from './blog.entity';
import { Metadata } from '@grpc/grpc-js';
import { CreateBlogRequest, CreateBlogResponse, GetBlogsResponse, GetBlogResponse, GetBlogRequest, DeleteBlogRequest, UpdateBlogRequest, UpdateBlogResponse } from 'blogpb/blogpb';

@Controller('blogpb')
export class BlogController {
    constructor(private blogService: BlogService){}
    @GrpcMethod('BlogService', 'GetBlog')
    getBlog(req: GetBlogRequest): Promise<any> {
        console.log('grpc server getBlog')
        return this.blogService.getBlog(req)
    }
    @GrpcMethod('BlogService', 'GetBlogs')
    getBlogs(): Promise<GetBlogsResponse> {
        console.log('grpc server getBlogs')
        return this.blogService.getBlogs()
    }
    @GrpcMethod('BlogService', 'CreateBlog')
    createBlog(req:CreateBlogRequest):Promise<CreateBlogResponse> {
        console.log('grpc server createBlog')
        return this.blogService.createBlog(req)
    }
    @GrpcMethod('BlogService', 'UpdateBlog')
    updateBlog(req: UpdateBlogRequest): Promise<UpdateBlogResponse> {
        console.log('grpc server updateBlog')
        return this.blogService.updateBlog(req)
    }
    @GrpcMethod('BlogService', 'DeleteBlog')
    deleteBlog(req: DeleteBlogRequest): Promise<string> {
        console.log('grpc server deleteBlog')
        this.blogService.deleteBlog(req)
        return
    }
}
