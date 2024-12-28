package main

import (
	"github.com/exoticcore/blog/internal/interface/handler"
	"github.com/exoticcore/blog/internal/interface/route"
	repository "github.com/exoticcore/blog/internal/repository/impl"
	usecase "github.com/exoticcore/blog/internal/usecase/impl"
	"github.com/exoticcore/blog/pkg/configuration"
	"github.com/exoticcore/blog/pkg/exception"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func main() {
	// setup configuration
	config := configuration.New()
	database := configuration.NewDatabase(config)

	// setup fiber
	app := fiber.New(configuration.NewFiberConfiguration())
	app.Use(recover())
	
	// routing
	initializeDependencies(app, database)

	err := app.Listen(":3005")
	exception.PanicLogging(err)
}

func initializeDependencies(app *fiber.App, database *gorm.DB) {
    // repository
    blogRepository := repository.NewBlogRepositoryImpl(database)

    // service
    blogUsecase := usecase.NewBlogUsecaseImpl(&blogRepository)

    // handler
    blogHandler := handler.NewBlogHandler(&blogUsecase)

    // routing
    route.SetupBlogRoutes(app, blogHandler)
}