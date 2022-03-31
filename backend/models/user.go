package models

import (
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID          primitive.ObjectID `bson:"_id, omitempty" json:"_id"`
	FirstName   string             `bson:"first_name, omitempty" json:"first_name"`
	LastName    string             `bson:"last_name, omitempty" json:"last_name"`
	Email       string             `bson:"email, omitempty" json:"email"`
	DateOfBirth time.Time          `bson:"date_of_birth, omitempty" json:"date_of_birth"`
	Address     Address            `bson:"address, omitempty, inline" json:"address"`
	Balance     Balance            `bson:"balance, omitempty, inline" json:"balance"`
}

func (user User) GetBSON() (interface{}, error) {
	u := User{
		ID:          user.ID,
		FirstName:   user.FirstName,
		LastName:    user.LastName,
		Email:       user.Email,
		DateOfBirth: user.DateOfBirth,
		Address:     user.Address,
		Balance:     user.Balance,
	}
	return u, nil
}

// UnmarshalJSON is a custom unmarshaler for User
func (u *User) UnmarshalBSON(data []byte) error {
	// Unmarshal into a temporary type where the "ends" field is a string.
	decoded := new(struct {
		ID          primitive.ObjectID `bson:"_id"`
		FirstName   string             `bson:"first_name"`
		LastName    string             `bson:"last_name"`
		Email       string             `bson:"email"`
		DateOfBirth string             `bson:"date_of_birth"`
		Address     Address            `bson:"address"`
		Balance     Balance            `bson:"balance"`
	})

	if err := bson.Unmarshal(data, decoded); err != nil {
		return err
	}

	u.ID = decoded.ID
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
	return nil
}

// MarshalBSON is a custom marshaler for User
func (u *User) MarshalBSON() ([]byte, error) {
	fmt.Println("I get called")
	return bson.Marshal(struct {
		ID          primitive.ObjectID `bson:"_id"`
		FirstName   string             `bson:"first_name"`
		LastName    string             `bson:"last_name"`
		Email       string             `bson:"email"`
		DateOfBirth string             `bson:"date_of_birth"`
		Address     Address            `bson:"address"`
		Balance     Balance            `bson:"balance"`
	}{
		ID:          u.ID,
		FirstName:   u.FirstName,
		LastName:    u.LastName,
		Email:       u.Email,
		DateOfBirth: u.DateOfBirth.Format("01-02-2006"),
		Address:     u.Address,
		Balance:     u.Balance,
	})
}

func (user User) String() string {
	return fmt.Sprintf("%s %s\n%s\n%s\n%s\n%s\n%s\n", user.FirstName, user.LastName, user.Email, user.DateOfBirth.Format("01-02-2006"), user.Address, user.Balance, user.Balance.AmountOnDate)
}
