package models

import "fmt"

type Balance struct {
	Amount       float64        `bson:"amount, omitempty"`
	Currency     string         `bson:"currency, omitempty"`
	AmountOnDate []AmountOnDate `bson:"amount_on_date"`
}

func (balance Balance) String() string {
	s := fmt.Sprintf("%f %s\n", balance.Amount, balance.Currency)
	return s
}
