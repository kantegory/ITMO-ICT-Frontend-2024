package storage

import (
	"backend/internal/models"
	"encoding/json"
	"log"
	"os"
	"sync"
)

type ClinicsStorageInterface interface {
	GetClinics() ([]models.Clinic, error)
	AddClinic(clinic models.Clinic) error
	DeleteClinic(name string) error
}

type ClinicsStorage struct {
	Clinics []models.Clinic
	mu      *sync.RWMutex
}

func NewClinicsStorage() *ClinicsStorage {
	storage := &ClinicsStorage{
		Clinics: []models.Clinic{},
		mu:      &sync.RWMutex{},
	}

	if err := storage.LoadClinics(); err != nil {
		log.Printf("Error loading clinics: %v", err)
	}

	return storage
}

func (cs *ClinicsStorage) LoadClinics() error {
	filename := "clinics.json"
	file, err := os.ReadFile(filename)
	if err != nil {
		log.Printf("Error reading file: %v", err)
		return err
	}

	var clinics []models.Clinic
	if err = json.Unmarshal(file, &clinics); err != nil {
		log.Printf("Error unmarshalling file: %v", err)
		return err
	}

	cs.mu.Lock()
	defer cs.mu.Unlock()
	cs.Clinics = clinics

	return nil
}

func (cs *ClinicsStorage) GetClinics() ([]models.Clinic, error) {
	cs.mu.RLock()
	defer cs.mu.RUnlock()

	return cs.Clinics, nil
}

func (cs *ClinicsStorage) AddClinic(clinic models.Clinic) error {
	cs.mu.Lock()
	defer cs.mu.Unlock()
	clinic.Id = len(cs.Clinics) + 1
	cs.Clinics = append(cs.Clinics, clinic)
	return nil
}

func (cs *ClinicsStorage) DeleteClinic(name string) error {
	cs.mu.Lock()
	defer cs.mu.Unlock()
	for i, clinic := range cs.Clinics {
		if clinic.Name == name {
			cs.Clinics = append(cs.Clinics[:i], cs.Clinics[i+1:]...)
			return nil
		}
	}
	return nil
}
