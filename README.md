# Dealls Backend Test

Made by Safiq Faray

## Tech Stack
- Language : TypeScript
- Framework : NestJS (with ExpressJS)
- Database : MySQL
- ORM : Prisma

## Setup
1. Clone the Repository
2. Rename `.env.example` to `.env`.
3. Make sure you have MySQL installed. Set `DATABASE_URL` according to your own configurations.
4. Run `npm install`
5. Run `npm install -g prisma`
6. run `npx prisma generate`
7. For migration, run `npx prisma migrate dev`. For seeding, run `npx prisma db seed`
8. For running the app, run `npm run start`
9. The default port is 3000

## Structure
This NestJS app contains 4 resources : 
- User
- Swipe History
- Match
- Payment History

For further explanation about the architecture, data flow, and DB structure, please refer to the document (located on `doc` directory).

Once logged in, the app will send a response containing a JWT token to be used for Bearer Token for authentication. Swipe History, Match, and Payment History API endpoints are protected, thus the need for Bearer Token. 

Swagger is used for API endpoints documentation and is located in `http://127.0.0.1:3000/docs`.

## Testing
Unit tests are made to test the logic of the services. Run `npm run test` to test it.

The code is formatted using a linter and verified by GitHub Actions upon being pushed.

