FROM golang:1.17 as builder

# Set the Current Working Directory inside the container
WORKDIR $GOPATH/src/github.com/JulianTeschner/CasinoIP2

# Copy everything from the current directory to the PWD (Present Working Directory) inside the container
COPY . . 

# Install the package

WORKDIR $GOPATH/src/github.com/JulianTeschner/CasinoIP2/cmd

RUN CGO_ENABLED=0 go build -v  .

### Second Stage

FROM alpine:3.8 as runner

# RUN apk add --no-cache bash

RUN apk --no-cache add ca-certificates

WORKDIR /backend

# COPY ./.env ./

WORKDIR /backend/bin

COPY --from=builder go/src/github.com/JulianTeschner/CasinoIP2/cmd ./

# This container exposes port 8080 to the outside world
EXPOSE 8080

# Run the executable
CMD ["./cmd"]
