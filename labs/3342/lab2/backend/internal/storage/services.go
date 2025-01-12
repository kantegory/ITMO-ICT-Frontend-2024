package storage

import (
	"backend/internal/models"
	"encoding/json"
	"log"
	"os"
	"sync"
)

type ServicesStorageInterface interface {
	GetServices() ([]models.Service, error)
	AddService(models.Service) error
	DeleteService(string) error
}

type ServicesStorage struct {
	services []models.Service
	mu       *sync.RWMutex
}

func NewServicesStorage() *ServicesStorage {
	storage := &ServicesStorage{
		services: []models.Service{},
		mu:       &sync.RWMutex{},
	}
	if err := storage.LoadServices(); err != nil {
		log.Printf("Error loading services: %v", err)
	}
	return storage
}

func (s *ServicesStorage) LoadServices() error {
	filename := "services.json"
	file, err := os.ReadFile(filename)
	if err != nil {
		log.Printf("Error reading file: %v", err)
		return err
	}

	var services []models.Service
	if err = json.Unmarshal(file, &services); err != nil {
		log.Printf("Error unmarshalling file: %v", err)
		return err
	}
	s.mu.Lock()
	s.services = services
	s.mu.Unlock()

	return nil
}

func (s *ServicesStorage) GetServices() ([]models.Service, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	return s.services, nil
}

func (s *ServicesStorage) AddService(service models.Service) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	service.Id = len(s.services) + 1
	s.services = append(s.services, service)

	return nil
}

func (s *ServicesStorage) DeleteService(name string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	for i, service := range s.services {
		if service.Name == name {
			s.services = append(s.services[:i], s.services[i+1:]...)
			return nil
		}
	}

	return nil
}
