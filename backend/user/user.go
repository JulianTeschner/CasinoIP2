package user

import (
	"encoding/json"
	"log"
	"time"

	"github.com/JulianTeschner/CasinoIP2/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID          primitive.ObjectID `bson:"_id, omitempty" json:"_id"`
	Username    string             `bson:"username" json:"username"`
	FirstName   string             `bson:"first_name, omitempty" json:"first_name"`
	LastName    string             `bson:"last_name, omitempty" json:"last_name"`
	Email       string             `bson:"email, omitempty" json:"email"`
	DateOfBirth time.Time          `bson:"date_of_birth, omitempty" json:"date_of_birth"`
	Address     models.Address     `bson:"address, omitempty, inline" json:"address"`
	Balance     models.Balance     `bson:"balance, omitempty, inline" json:"balance"`
	IsActive    bool               `bson:"is_active, omitempty" json:"is_active"`
	LastLogin   time.Time          `bson:"last_login, omitempty" json:"last_login"`
	LoginStreak int                `bson:"login_streak, omitempty" json:"login_streak"`
}

// UnmarshalBSON is a custom bson unmarshaler for User
func (u *User) UnmarshalBSON(data []byte) error {
	// Unmarshal into a temporary type where the "ends" field is a string.
	decoded := new(struct {
		ID          primitive.ObjectID `bson:"_id"`
		Username    string             `bson:"username"`
		FirstName   string             `bson:"first_name"`
		LastName    string             `bson:"last_name"`
		Email       string             `bson:"email"`
		DateOfBirth string             `bson:"date_of_birth"`
		Address     models.Address     `bson:"address"`
		Balance     models.Balance     `bson:"balance"`
		IsActive    bool               `bson:"is_active" `
		LastLogin   string             `bson:"last_login"`
		LoginStreak int                `bson:"login_streak"`
	})

	if err := bson.Unmarshal(data, decoded); err != nil {
		return err
	}

	u.ID = decoded.ID
	u.Username = decoded.Username
	u.FirstName = decoded.FirstName
	u.LastName = decoded.LastName
	u.Email = decoded.Email
	date, err := time.Parse("01-02-2006", decoded.DateOfBirth)
	if err != nil {
		return err
	}
	u.DateOfBirth = date
	u.Address = decoded.Address
	u.Balance = decoded.Balance
	u.IsActive = decoded.IsActive
	login, err := time.Parse("01-02-2006", decoded.LastLogin)
	if err != nil {
		return err
	}
	u.LastLogin = login
	u.LoginStreak = decoded.LoginStreak
	return nil
}

// MarshalBSON is a custom bson marshaler for User
func (u *User) MarshalBSON() ([]byte, error) {
	return bson.Marshal(struct {
		ID          primitive.ObjectID `bson:"_id"`
		Username    string             `bson:"username"`
		FirstName   string             `bson:"first_name"`
		LastName    string             `bson:"last_name"`
		Email       string             `bson:"email"`
		DateOfBirth string             `bson:"date_of_birth"`
		Address     models.Address     `bson:"address"`
		Balance     models.Balance     `bson:"balance"`
		IsActive    bool               `bson:"is_active"`
		LastLogin   string             `bson:"last_login"`
		LoginStreak int                `bson:"login_streak"`
	}{
		ID:          u.ID,
		Username:    u.Username,
		FirstName:   u.FirstName,
		LastName:    u.LastName,
		Email:       u.Email,
		DateOfBirth: u.DateOfBirth.Format("01-02-2006"),
		Address:     u.Address,
		Balance:     u.Balance,
		IsActive:    u.IsActive,
		LastLogin:   u.LastLogin.Format("01-02-2006"),
		LoginStreak: u.LoginStreak,
	})
}

// UnmarshalJSON is a custom json unmarshaler for User
func (u *User) UnmarshalJSON(data []byte) error {
	// Unmarshal into a temporary type where the "ends" field is a string.
	log.Println("UnmarshalJSON")
	decoded := new(struct {
		ID          primitive.ObjectID `json:"_id"`
		Username    string             `json:"username"`
		FirstName   string             `json:"first_name"`
		LastName    string             `json:"last_name"`
		Email       string             `json:"email"`
		DateOfBirth string             `json:"date_of_birth"`
		Address     models.Address     `json:"address"`
		Balance     models.Balance     `json:"balance"`
		IsActive    bool               `json:"is_active"`
		LastLogin   string             `json:"last_login"`
		LoginStreak int                `json:"login_streak"`
	})

	if err := json.Unmarshal(data, decoded); err != nil {
		return err
	}

	if decoded.ID == primitive.NilObjectID {
		u.ID = primitive.NewObjectID()
	} else {
		u.ID = decoded.ID
	}
	u.Username = decoded.Username
	u.FirstName = decoded.FirstName
	u.LastName = decoded.LastName
	u.Email = decoded.Email
	date, err := time.Parse("01-02-2006", decoded.DateOfBirth)
	if err != nil {
		return err
	}
	u.DateOfBirth = date
	u.Address = decoded.Address
	u.Balance = decoded.Balance
	u.IsActive = decoded.IsActive
	login, err := time.Parse("01-02-2006", decoded.LastLogin)
	if err != nil {
		return err
	}
	u.LastLogin = login
	u.LoginStreak = decoded.LoginStreak
	return nil
}

func (u *User) MarshalJSON() ([]byte, error) {
	return json.Marshal(struct {
		ID          primitive.ObjectID `json:"_id"`
		Username    string             `json:"username"`
		FirstName   string             `json:"first_name"`
		LastName    string             `json:"last_name"`
		Email       string             `json:"email"`
		DateOfBirth string             `json:"date_of_birth"`
		Address     models.Address     `json:"address"`
		Balance     models.Balance     `json:"balance"`
		IsActive    bool               `json:"is_active"`
		LastLogin   string             `json:"last_login"`
		LoginStreak int                `json:"login_streak"`
	}{
		ID:          u.ID,
		Username:    u.Username,
		FirstName:   u.FirstName,
		LastName:    u.LastName,
		Email:       u.Email,
		DateOfBirth: u.DateOfBirth.Format("01-02-2006"),
		Address:     u.Address,
		Balance:     u.Balance,
		IsActive:    u.IsActive,
		LastLogin:   u.LastLogin.Format("01-02-2006"),
		LoginStreak: u.LoginStreak,
	})
}

// func (user User) String() string {
// 	return fmt.Sprintf("%s %s\n%s\n%s\n%s\n%s\n%s\n%d\n", user.FirstName, user.LastName,
// 		user.Email,
// 		user.DateOfBirth.Format("01-02-2006"),
// 		user.Address,
// 		user.Balance,
// 		user.LastLogin.Format("01-02-2006"),
// 		user.LoginStreak)
//
// }
