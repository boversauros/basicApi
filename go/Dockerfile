FROM golang:1.14

WORKDIR /usr/src
COPY . /usr/src
RUN go get -d github.com/gorilla/mux
EXPOSE 5002

CMD ["go","run","main.go"]