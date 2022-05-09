package models

type Balance struct {
	Amount      float64 `bson:"amount, omitempty"`
	Currency    string  `bson:"currency, omitempty"`
	LastDeposit float64 `bson:"last_deposit, omitempty"`
}

// func (balance Balance) String() string {
// 	s := fmt.Sprintf("%f %s %f", balance.Amount, balance.Currency, balance.LastDeposit)
// 	return s
// }
