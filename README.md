# Zywa Backend Engineer Assignment

Create backend that returns status of card

## Tech stack

- Express Backend
- Mongoose DB
- Docker

## Prerequisites

- Extract the zip files
- run docker-compose up --build in base folder it will run the app locally on port 3000 and local mongodb
- Shutdown docker by using docker-compose down after use

## API Guide

> **After the app is running**: use any app of your choice or postman to hit post request on http://localhost:3000/get_card_status with request body containing either number or card Id like as follows
> {

    "cardId":"ZYW8890"

} or {
"phoneNumber":"0545576586"
}
After running the logic it'll return if card status if present or null

### Suggested improvements

- Standardize input data format
- add auth to backend
- fine tune file handling logic according to business requirement
- Follow standard practices for creating a enterprice level software making it easy to add functionality as well as maintainence
