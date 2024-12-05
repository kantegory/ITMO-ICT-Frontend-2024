package models

type User struct {
	Id           int            `json:"id"`
	FirstName    string         `json:"firstName"`
	LastName     string         `json:"lastName"`
	Sex          string         `json:"sex"`
	BirthDate    string         `json:"birthDate"`
	Phone        string         `json:"phone"`
	Email        string         `json:"email"`
	Password     string         `json:"password"`
	DoctorVisits []DoctorVisits `json:"doctorVisits,omitempty"`
}

type DoctorVisits struct {
	Date    string `json:"date"`
	Doctor  string `json:"doctor"`
	Service string `json:"service"`
}

type Clinic struct {
	Id       int    `json:"id"`
	Name     string `json:"name"`
	Address  string `json:"address"`
	District string `json:"district"`
	Image    string `json:"image"`
}

type Service struct {
	Id          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}
