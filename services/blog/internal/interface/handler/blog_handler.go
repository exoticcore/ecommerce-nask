package handler

import (
	"github.com/exoticcore/blog/internal/model"
	"github.com/exoticcore/blog/internal/usecase"
	"github.com/exoticcore/blog/pkg/exception"
	"github.com/gofiber/fiber/v2"
)

type BlogHandler interface {
	CreateBlog(c *fiber.Ctx) error
	GetAllBlogs(c *fiber.Ctx) error
	GetBlogBySlug(c *fiber.Ctx) error
}

type blogHandler struct {
	usecase.BlogUsecase
}

func NewBlogHandler(blogUsecase *usecase.BlogUsecase) BlogHandler {
	return &blogHandler{BlogUsecase: *blogUsecase}
}

func (handler *blogHandler) CreateBlog(c *fiber.Ctx) error {
	var request model.BlogCreateOrUpdateModel
	err := c.BodyParser(&request)
	exception.PanicLogging(err)

	response := handler.BlogUsecase.Create(c.Context(), request)
	return c.Status(fiber.StatusCreated).JSON(model.GeneralResponse{
		Code: 201,
		Message: "Success",
		Data: response,

	})
}

func (handler *blogHandler) GetAllBlogs(c *fiber.Ctx) error {
	response := handler.BlogUsecase.GetAll(c.Context())
	return c.Status(fiber.StatusOK).JSON(model.GeneralResponse{
		Code: 200,
		Message: "Success",
		Data: response,
	})
}

func (handler *blogHandler) GetBlogBySlug(c *fiber.Ctx) error {
	slug := c.Params("slug")
	response := handler.BlogUsecase.GetBySlug(c.Context(), slug)
	return c.Status(fiber.StatusOK).JSON(model.GeneralResponse{
		Code: 200,
		Message: "Success",
		Data: response,
	})
}