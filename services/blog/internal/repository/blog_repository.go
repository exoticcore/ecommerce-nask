package repository

import (
	"context"

	"github.com/exoticcore/blog/internal/entity"
)

type BlogRepository interface {
	Create(ctx context.Context, blog entity.Blog) entity.Blog
	GetAll(ctx context.Context) []entity.Blog
	GetBySlug(ctx context.Context, slug string) (entity.Blog, error)
}