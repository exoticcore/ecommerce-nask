package configuration

import (
	"github.com/exoticcore/blog/internal/entity"
	"github.com/exoticcore/blog/pkg/exception"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func NewDatabase(config Config) *gorm.DB {
	username := config.Get("DB_USERNAME")
	password := config.Get("DB_PASSWORD")
	host := config.Get("DB_HOST")
	port := config.Get("DB_PORT")
	dbName := config.Get("DB_DB_NAME")

	db, err := gorm.Open(mysql.Open(username+":"+password+"@tcp("+host+":"+port+")/"+dbName+"?parseTime=true"))
	exception.PanicLogging(err)

	err = db.AutoMigrate(&entity.Blog{})
	exception.PanicLogging(err)

	return db
}