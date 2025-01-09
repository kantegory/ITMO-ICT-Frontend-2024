package storage

import (
	"backend/internal/models"
	"encoding/json"
	"log"
	"os"
	"sync"
)

type UsersStorage struct {
	users []models.User
	mu    *sync.RWMutex
}

func NewUsersStorage() *UsersStorage {
	storage := &UsersStorage{
		users: []models.User{},
		mu:    &sync.RWMutex{},
	}
	if err := storage.LoadUsers(); err != nil {
		log.Printf("Error loading services: %v", err)
	}
	return storage
}

func (s *UsersStorage) LoadUsers() error {
	filename := "users.json"
	file, err := os.ReadFile(filename)
	if err != nil {
		log.Printf("Error reading file: %v", err)
		return err
	}

	var users []models.User
	if err = json.Unmarshal(file, &users); err != nil {
		log.Printf("Error unmarshalling file: %v", err)
		return err
	}
	s.mu.Lock()
	s.users = users
	s.mu.Unlock()

	return nil
}

func (s *UsersStorage) GetUsers() ([]models.User, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	return s.users, nil
}

func (s *UsersStorage) AddUser(u models.User) (int, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	u.Id = len(s.users) + 1
	s.users = append(s.users, u)

	if err := s.saveUsers(); err != nil {
		return 0, err
	}

	return u.Id, nil
}

func (s *UsersStorage) saveUsers() error {
	file, err := json.MarshalIndent(s.users, "", "  ")
	if err != nil {
		return err
	}

	if err := os.WriteFile("users.json", file, 0644); err != nil {
		return err
	}

	return nil
}

func (s *UsersStorage) GetUserByEmail(email string) (models.User, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	for _, user := range s.users {
		if user.Email == email {
			return user, nil
		}
	}

	return models.User{}, nil
}
