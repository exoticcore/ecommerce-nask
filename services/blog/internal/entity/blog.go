package entity

import "github.com/google/uuid"

type Blog struct {
	ID			uuid.UUID
	Slug		string			`gorm:"unique"`
	Title		string
	Content		string
}

func (Blog) TableName() string {
	return "tb_blog"
}