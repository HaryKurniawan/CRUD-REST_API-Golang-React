package repositories

import (
	"backend-go/config"
	"backend-go/models"
)

// ---------------------------------------------------------
// Kalau di Prisma JS:                Di GORM Go:
//   prisma.post.findMany()      →    db.Find(&posts)
//   prisma.post.findUnique()    →    db.First(&post, id)
//   prisma.post.create()        →    db.Create(&post)
//   prisma.post.update()        →    db.Save(&post)
//   prisma.post.delete()        →    db.Delete(&post, id)
// ---------------------------------------------------------

func GetAllPosts() ([]models.Post, error) {
	var posts []models.Post
	result := config.DB.Order("created_at desc").Find(&posts)
	return posts, result.Error
}

func GetPostByID(id int) (*models.Post, error) {
	var post models.Post
	result := config.DB.First(&post, id)
	if result.Error != nil {
		return nil, result.Error // termasuk gorm.ErrRecordNotFound
	}
	return &post, nil
}

func CreatePost(req models.CreatePostRequest) (*models.Post, error) {
	post := models.Post{
		Title:   req.Title,
		Content: req.Content,
	}
	result := config.DB.Create(&post)
	return &post, result.Error
}

func UpdatePost(id int, req models.UpdatePostRequest) (*models.Post, error) {
	var post models.Post
	// Cari dulu
	if err := config.DB.First(&post, id).Error; err != nil {
		return nil, err
	}
	// Update field
	post.Title   = req.Title
	post.Content = req.Content
	result := config.DB.Save(&post)
	return &post, result.Error
}

func DeletePost(id int) (bool, error) {
	result := config.DB.Delete(&models.Post{}, id)
	if result.Error != nil {
		return false, result.Error
	}
	return result.RowsAffected > 0, nil
}
