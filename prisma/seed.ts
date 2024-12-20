// app/prisma/seed.ts
import { PrismaClient, User, Gender, Membership } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hash } from 'bcryptjs';
import { CreateUserDto } from "../src/users/dto/create-user.dto";


const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({}); // use with caution.

  const amountOfUsers = 50;

  const users: CreateUserDto[] = [];

  for (let i = 0; i < amountOfUsers; i++) {
    const name = faker.person.firstName();
    const password = await hash("password", 10);
    let random = Math.floor(Math.random() * 1000);
    const user = {
      name,
      email: `${name.toLowerCase()}${random}@example.com`,
      password: password,
      nickname: faker.internet.username(),
      gender: faker.helpers.arrayElement([Gender.MALE, Gender.FEMALE, Gender.OTHER]),
      birthdate: faker.date.past({ years: 30 }),
      photo: faker.image.avatar(),
      interests: faker.lorem.words(3),
      membership: faker.helpers.arrayElement([Membership.FREE]),
    };

    users.push(user);
  }


  const addUsers = async () => await prisma.user.createMany({ data: users });

  addUsers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
