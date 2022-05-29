package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"nest-client/blogpb"
	"nest-client/graph/generated"
	"nest-client/graph/model"
	"nest-client/svc"
)

func (r *mutationResolver) CreateBlog(ctx context.Context, input model.NewBlog) (*blogpb.Blog, error) {
	fmt.Println("Create blog graph")
	res, err := svc.BlogSvc().CreateBlog(ctx, &blogpb.CreateBlogRequest{
		Author:  input.Author,
		Content: input.Content,
	})
	if err != nil {
		return nil, err
	}
	return res.Blog, nil
}

func (r *mutationResolver) UpdateBlog(ctx context.Context, input *model.UpdateBlog) (*blogpb.Blog, error) {
	fmt.Println("Update blog graph")
	res, err := svc.BlogSvc().UpdateBlog(ctx, &blogpb.UpdateBlogRequest{
		Blog: &blogpb.Blog{
			Id:      int32(input.ID),
			Author:  input.Author,
			Content: input.Content,
		},
	})
	if err != nil {
		return nil, err
	}
	return res.Blog, nil
}

func (r *mutationResolver) DeleteBlog(ctx context.Context, id int) (*blogpb.Blog, error) {
	fmt.Println("Delete blog graph")
	res, err := svc.BlogSvc().DeleteBlog(ctx, &blogpb.DeleteBlogRequest{Id: int32(id)})
	if err != nil {
		return nil, err
	}
	return res.Blog, nil
}

func (r *queryResolver) Blogs(ctx context.Context) ([]*blogpb.Blog, error) {
	fmt.Println("Blogs graph")
	res, err := svc.BlogSvc().GetBlogs(ctx, &blogpb.GetBlogsRequest{})
	if err != nil {
		return nil, err
	}
	return res.Blog, nil
}

func (r *queryResolver) Blog(ctx context.Context, id int) (*blogpb.Blog, error) {
	fmt.Println("Blog graph")
	res, err := svc.BlogSvc().GetBlog(ctx, &blogpb.GetBlogRequest{Id: int32(id)})
	if err != nil {
		return nil, err
	}
	return res.Blog, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
