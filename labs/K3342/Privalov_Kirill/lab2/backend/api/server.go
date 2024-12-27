package api

import (
	"backend/internal/storage"
	"net/http"
)

type Server struct {
	httpServer      *http.Server
	userStorage     *storage.UsersStorage
	clinicsStorage  *storage.ClinicsStorage
	servicesStorage *storage.ServicesStorage
	mux             *http.ServeMux
}

func NewServer(userStorage *storage.UsersStorage, clinicsStorage *storage.ClinicsStorage, serviceStorage *storage.ServicesStorage) *Server {
	mux := http.NewServeMux()

	server := &Server{
		httpServer: &http.Server{
			Addr:    ":8080",
			Handler: mux,
		},
		userStorage:     userStorage,
		clinicsStorage:  clinicsStorage,
		servicesStorage: serviceStorage,
		mux:             mux,
	}

	server.configureRouter()

	return server
}

func (s *Server) configureRouter() {
	// auth
	s.mux.Handle("/api/v1/signup", s.LogMiddleware(s.CorsMiddleware(http.HandlerFunc(s.SignUp))))
	s.mux.Handle("/api/v1/signin", s.LogMiddleware(s.CorsMiddleware(http.HandlerFunc(s.SignIn))))

	// clinics
	s.mux.Handle("/api/v1/clinics", s.LogMiddleware(s.CorsMiddleware(http.HandlerFunc(s.Clinics))))
	//s.mux.HandleFunc("/api/v1/clinics/add", s.AddClinic)
	//s.mux.HandleFunc("/api/v1/clinics/update", s.UpdateClinic)
	//s.mux.HandleFunc("/api/v1/clinics/delete", s.DeleteClinic)

	// services
	s.mux.Handle("/api/v1/services", s.LogMiddleware(s.CorsMiddleware(http.HandlerFunc(s.Services))))
	//s.mux.HandleFunc("/api/v1/services/add", s.AddService)
	//s.mux.HandleFunc("/api/v1/services/update", s.UpdateService)
	//s.mux.HandleFunc("/api/v1/services/delete", s.DeleteService)

	// users
	s.mux.Handle("/api/v1/user", s.LogMiddleware(s.CorsMiddleware(http.HandlerFunc(s.User))))
	s.mux.Handle("/api/v1/user/visits", s.LogMiddleware(s.CorsMiddleware(http.HandlerFunc(s.UserVisits))))
}

func (s *Server) ListenAndServe() error {
	return s.httpServer.ListenAndServe()
}

func (s *Server) Shutdown() error {
	return s.httpServer.Shutdown(nil)
}
