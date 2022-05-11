package models

// import "go.mongodb.org/mongo-driver/bson"

type Address struct {
	Street string `bson:"street, omitempty" json:"street"`
	City   string `bson:"city, omitempty" josn:"city"`
	State  string `bson:"state, omitempty" json:"state"`
	Zip    string `bson:"zip, omitempty" json:"zip"`
}

// func (address Address) String() string {
// 	return fmt.Sprintf("%s\n%s\n%s\n%s\n", address.Street, address.City, address.State, address.Zip)
// }
