package models

import "fmt"

type Address struct {
	Street string `bson:"street, omitempty"`
	City   string `bson:"city, omitempty"`
	State  string `bson:"state, omitempty"`
	Zip    string `bson:"zip, omitempty"`
}

func (address Address) String() string {
	return fmt.Sprintf("%s\n%s\n%s\n%s\n", address.Street, address.City, address.State, address.Zip)
}
