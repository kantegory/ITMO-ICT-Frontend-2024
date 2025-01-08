package utils

import (
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

type CustomClaims struct {
	UserId int    `json:"userId"`
	Email  string `json:"email"`
	jwt.StandardClaims
}

const mySigningKey = "JustAnInsecureKey"

func HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hash), nil
}

func ValidatePassword(hash, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if err != nil {
		return false
	}
	return true
}

func GenerateToken(userId int, email string) (string, error) {
	var customClaims CustomClaims
	customClaims.UserId = userId
	customClaims.Email = email

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, customClaims)
	ss, err := token.SignedString([]byte(mySigningKey))
	if err != nil {
		return "", err
	}

	return ss, nil
}

func ParseToken(tokenString string) (*CustomClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(mySigningKey), nil
	})
	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*CustomClaims)
	if !ok {
		return nil, err
	}

	return claims, nil
}
