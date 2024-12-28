package usecase

import (
	"context"

	"github.com/exoticcore/blog/internal/model"
)

type BlogUsecase interface {
	Create(ctx context.Context, model model.BlogCreateOrUpdateModel) model.BlogCreateOrUpdateModel
	GetAll(ctx context.Context) []model.BlogModel
	GetBySlug(ctx context.Context, slug string) (model.BlogModel)
}

