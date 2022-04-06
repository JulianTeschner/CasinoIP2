package models

import (
	"encoding/json"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

type AmountOnDate struct {
	Date   time.Time `bson:"date"`
	Amount float64   `bson:"amount"`
}

func (amountOnDate AmountOnDate) String() string {
	return fmt.Sprintf("%s: %f\n", amountOnDate.Date.Format("01-02-2006"), amountOnDate.Amount)
}

// UnmarshalBSON is a custom unmarshaller for AmountOnDate
func (a *AmountOnDate) UnmarshalBSON(data []byte) error {
	decoded := new(struct {
		Date   string  `bson:"date"`
		Amount float64 `bson:"amount"`
	})

	if err := bson.Unmarshal(data, decoded); err != nil {
		return err
	}

	date, err := time.Parse("01-02-2006", decoded.Date)
	if err != nil {
		return err
	}

	a.Date = date
	a.Amount = decoded.Amount

	return nil
}

// MarshalBSON is a custom marshaller for AmountOnDate
func (a *AmountOnDate) MarshalBSON() ([]byte, error) {
	return bson.Marshal(struct {
		Date   string  `bson:"date"`
		Amount float64 `bson:"amount"`
	}{
		Date:   a.Date.Format("01-02-2006"),
		Amount: a.Amount,
	})
}

// UnmarshalJSON is a custom unmarshaller for AmountOnDate
func (a *AmountOnDate) UnmarshalJSON(data []byte) error {
	decoded := new(struct {
		Date   string  `bson:"date"`
		Amount float64 `bson:"amount"`
	})

	if err := json.Unmarshal(data, decoded); err != nil {
		return err
	}

	date, err := time.Parse("01-02-2006", decoded.Date)
	if err != nil {
		return err
	}

	a.Date = date
	a.Amount = decoded.Amount

	return nil
}

func (a *AmountOnDate) MarshalJSON() ([]byte, error) {
	return json.Marshal(struct {
		Date   string  `bson:"date"`
		Amount float64 `bson:"amount"`
	}{
		Date:   a.Date.Format("01-02-2006"),
		Amount: a.Amount,
	})
}
