FROM golang:1.14.2 as gobuild

WORKDIR /build

COPY main.go .
COPY go.mod .
COPY go.sum .
COPY config config
COPY gpio gpio
COPY hub hub
COPY socket socket
COPY status status

ENV GOOS=linux
ENV GOARCH=arm
ENV GOARM=7
RUN go build

FROM node:13 as webbuild

WORKDIR /build
COPY web/package.json .
COPY web/yarn.lock .
RUN yarn install

COPY web/tsconfig.json .
COPY web/webpack.config.js .
COPY web/style.css .
COPY web/index.html .
COPY web/assets assets
COPY web/src src
RUN yarn build

FROM scratch
WORKDIR /app

COPY --from=gobuild /build/sound-board .
COPY --from=webbuild /build/dist ./web/dist

EXPOSE 8080
VOLUME /app/config.json
CMD ["/app/sound-board"]