
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface NewBlog {
    author: string;
    content: string;
}

export interface UpdateBlog {
    id: number;
    author: string;
    content: string;
}

export interface Blog {
    id: number;
    author: string;
    content: string;
}

export interface IQuery {
    getBlogs(): Blog[] | Promise<Blog[]>;
    getBlog(id: number): Blog | Promise<Blog>;
}

export interface IMutation {
    createBlog(input: NewBlog): Blog | Promise<Blog>;
    updateBlog(input?: Nullable<UpdateBlog>): Blog | Promise<Blog>;
    deleteBlog(id: number): Blog | Promise<Blog>;
}

export interface ISubscription {
    blogAdded(): Blog | Promise<Blog>;
}

type Nullable<T> = T | null;
