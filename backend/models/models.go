package models

import (
	"fmt"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID          primitive.ObjectID `bson:"_id, omitempty"`
	FirstName   string             `bson:"first_name, omitempty"`
	LastName    string             `bson:"last_name, omitempty"`
	Email       string             `bson:"email, omitempty"`
	DateOfBirth string             `bson:"date_of_birth, omitempty"`
	Address     Address            `bson:"address, omitempty"`
	Balance     Balance            `bson:"balance, omitempty"`
}

type Address struct {
	Street string `bson:"street, omitempty"`
	City   string `bson:"city, omitempty"`
	State  string `bson:"state, omitempty"`
	Zip    string `bson:"zip, omitempty"`
}

type Balance struct {
	Amount       float64        `bson:"amount, omitempty"`
	Currency     string         `bson:"currency, omitempty"`
	AmountOnDate []AmountOnDate `bson:"amount_on_date"`
}

type AmountOnDate struct {
	Date   string  `bson:"date"`
	Amount float64 `bson:"amount"`
}

func (user User) String() string {
	return fmt.Sprintf("%s %s\n%s\n%s\n%s\n%s\n%s\n", user.FirstName, user.LastName, user.Email, user.DateOfBirth, user.Address, user.Balance, user.Balance.AmountOnDate)
}

func (address Address) String() string {
	return fmt.Sprintf("%s\n%s\n%s\n%s\n", address.Street, address.City, address.State, address.Zip)
}

func (balance Balance) String() string {
	s := fmt.Sprintf("%f\n", balance.Amount)
	for _, amountOnDate := range balance.AmountOnDate {
		s += amountOnDate.String()
	}
	return s
}

func (amountOnDate AmountOnDate) String() string {
	return fmt.Sprintf("%s: %f\n", amountOnDate.Date, amountOnDate.Amount)
}
