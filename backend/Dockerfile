FROM golang:1.17

# # Set the Current Working Directory inside the container
# WORKDIR $GOPATH/src/github.com/JulianTeschner/CasinoIP2
#
# # Copy everything from the current directory to the PWD (Present Working Directory) inside the container
# COPY . .
#
# # # Download all the dependencies
# # RUN go get -d -v ./...
#
# # Install the package
# RUN go install -v ./...
#
# COPY .env $GOPATH/src/github.com/JulianTeschner
#
# # This container exposes port 8080 to the outside world
# EXPOSE 8080
#
# # Run the executable
# CMD ["cmd"]


RUN mkdir /app

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download && go mod verify

COPY . .

WORKDIR /app/cmd

RUN go build -v -o /usr/local/bin/app ./... 

CMD ["app"]
