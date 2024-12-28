package model

type BlogModel struct {
	ID	  string `json:"id"`
	Slug	  string `json:"slug"`
	Title	  string `json:"title"`
	Content	  string `json:"content"`
}

type BlogCreateOrUpdateModel struct {
	Slug	  string `json:"slug"`
	Title	  string `json:"title"`
}