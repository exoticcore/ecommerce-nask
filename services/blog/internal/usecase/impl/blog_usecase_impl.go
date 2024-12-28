package impl

import (
	"context"

	"github.com/exoticcore/blog/internal/entity"
	"github.com/exoticcore/blog/internal/model"
	"github.com/exoticcore/blog/internal/repository"
	"github.com/exoticcore/blog/internal/usecase"
	"github.com/exoticcore/blog/pkg/common"
	"github.com/exoticcore/blog/pkg/exception"
)



func NewBlogUsecaseImpl(blogRepository *repository.BlogRepository) usecase.BlogUsecase {
	return &blogUsecaseImpl{BlogRepository: *blogRepository}
}

type blogUsecaseImpl struct {
	repository.BlogRepository
}

func (usecase *blogUsecaseImpl) Create(ctx context.Context, blogModel model.BlogCreateOrUpdateModel) model.BlogCreateOrUpdateModel {
	common.Validate(blogModel)
	blog := entity.Blog{
		Title:		blogModel.Title,
		Slug:	blogModel.Slug,
	}
	usecase.BlogRepository.Create(ctx, blog)
	return blogModel
}

func (usecase *blogUsecaseImpl) GetAll(ctx context.Context) (responses []model.BlogModel) {
	blogs := usecase.BlogRepository.GetAll(ctx)
	for _, blog := range blogs {
		responses = append(responses, model.BlogModel{
			ID:		blog.ID.String(),
			Slug:	blog.Slug,
			Title:	blog.Title,
			Content:	blog.Content,
		})
	}
	if len(blogs) == 0 {
		return []model.BlogModel{}
	}

	return responses
}

func (usecase *blogUsecaseImpl) GetBySlug(ctx context.Context, slug string) (model.BlogModel) {
	blog, err := usecase.BlogRepository.GetBySlug(ctx, slug)

	if err != nil {
		panic(exception.NotFoundError{Message: err.Error()})
	}

	return model.BlogModel{
		ID:		blog.ID.String(),
		Slug:	blog.Slug,
		Title:	blog.Title,
		Content:	blog.Content,
	}
}