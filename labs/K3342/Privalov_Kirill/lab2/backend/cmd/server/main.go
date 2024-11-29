package main

import (
	"backend/api"
	"backend/internal/storage"
)

func main() {
	usersStore := storage.NewUsersStorage()
	clinicsStore := storage.NewClinicsStorage()
	servicesStore := storage.NewServicesStorage()

	s := api.NewServer(usersStore, clinicsStore, servicesStore)

	go func() {
		err := s.ListenAndServe()
		if err != nil {
			panic(err)
		}
	}()

	select {}
}
