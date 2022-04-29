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
## We copy everything in the root directory
## into our /app directory
ADD . /app

RUN go mod download
## We specify that we now wish to execute 
## any further commands inside our /app
## directory
WORKDIR /app/cmd
## we run go build to compile the binary
## executable of our Go program
RUN go build -o main .
## Our start command which kicks off
## our newly created binary executable
CMD ["/app/cmd/main"]
