package route

import (
	"github.com/exoticcore/blog/internal/interface/handler"
	"github.com/gofiber/fiber/v2"
)

func SetupBlogRoutes(app *fiber.App, blogHandler handler.BlogHandler) {
	app.Post("/blog", blogHandler.CreateBlog)
	app.Get("/blog", blogHandler.GetAllBlogs)
	app.Get("/blog/:slug", blogHandler.GetBlogBySlug)
}