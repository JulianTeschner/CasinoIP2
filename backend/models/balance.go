package models

import "fmt"

type Balance struct {
	Amount      float64 `bson:"amount, omitempty" json:"amount"`
	Currency    string  `bson:"currency, omitempty" json:"currency"`
	LastDeposit float64 `bson:"last_deposit, omitempty" json:"last_deposit"`
}

func (balance Balance) String() string {
	s := fmt.Sprintf("%f %s %f", balance.Amount, balance.Currency, balance.LastDeposit)
	return s
}
