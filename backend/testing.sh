#!/bin/bash
# go test -covermode=count -coverprofile=coverage.out ./...
# go tool cover -html=coverage.out -o coverage.html
# go tool cover -html=coverage.out
go-acc ./... -- -covermode=count -coverprofile=coverage.out


go tool cover -html=coverage.out
