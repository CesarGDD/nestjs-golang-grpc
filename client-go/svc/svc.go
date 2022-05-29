package svc

import (
	"log"
	"nest-client/blogpb"

	"google.golang.org/grpc"
)

func BlogSvc() blogpb.BlogServiceClient {
	opts := grpc.WithInsecure()
	cc, err := grpc.Dial("localhost:5000", opts)
	if err != nil {
		log.Fatalf("Could not connect: %v", err)
	}
	// defer cc.Close()
	blogsvc := blogpb.NewBlogServiceClient(cc)

	return blogsvc
}
