const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();

async function main() {
  // Generate 10 fake users
  const users = [];
  for (let i = 0; i < 10; i++) {
    const newUser = await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(), // In real use, ensure to hash passwords
      },
    });
    users.push(newUser);
    console.log(`Created user: ${newUser.username}`);
  }

  // Generate 5 fake products
  const products = [];
  for (let i = 0; i < 5; i++) {
    const newProduct = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price_in_gold: parseFloat(faker.commerce.price(10, 100)), // Random price between 10 and 100 gold
        stock_quantity: faker.number.int({ min: 1, max: 100 }), // Random stock between 1 and 100
      },
    });
    products.push(newProduct);
    console.log(`Created product: ${newProduct.name}`);
  }

  // Generate inventory for each user
  for (let user of users) {
    const randomProducts = faker.helpers.arrayElements(
      products,
      faker.number.int({ min: 1, max: 3 })
    ); // Each user gets 1 to 3 products
    for (let product of randomProducts) {
      const newInventoryItem = await prisma.inventory.create({
        data: {
          user_id: user.user_id,
          product_id: product.product_id,
          quantity: faker.number.int({ min: 1, max: 10 }), // Random quantity between 1 and 10
          status: faker.helpers.arrayElement(["OWNED", "USED", "SOLD"]), // Random status
        },
      });
      console.log(
        `Created inventory item for user ${user.username} with product ${product.name}`
      );
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
