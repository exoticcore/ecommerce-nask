package impl

import (
	"context"

	"github.com/exoticcore/blog/internal/entity"
	"github.com/exoticcore/blog/internal/repository"
	"github.com/exoticcore/blog/pkg/exception"
	"github.com/google/uuid"
	"gorm.io/gorm"
)



func NewBlogRepositoryImpl(DB *gorm.DB) repository.BlogRepository {
	return &blogRepositoryImpl{DB: DB}
}

type blogRepositoryImpl struct {
	*gorm.DB
}

func (repository *blogRepositoryImpl) Create(ctx context.Context, blog entity.Blog) entity.Blog {
	blog.ID = uuid.New()
	err := repository.DB.WithContext(ctx).Create(&blog).Error
	exception.PanicLogging(err)
	return blog

}

func (repository *blogRepositoryImpl) GetAll(ctx context.Context) []entity.Blog {
	var blogs []entity.Blog
	repository.DB.WithContext(ctx).Find(&blogs)
	return blogs
}

func (repository *blogRepositoryImpl) GetBySlug(ctx context.Context, slug string) (entity.Blog, error) {
	var blog entity.Blog
	result := repository.DB.WithContext(ctx).Unscoped().Where("slug = ?", slug).First(&blog)
	if result.RowsAffected == 0 {
		panic(exception.NotFoundError{
			Message: "Blog not found",
		})
	}
	return blog, nil
}