const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Clean up existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.menuItem.deleteMany()
  await prisma.table.deleteMany()

  // Create menu items
  const menuItems = await Promise.all([
    prisma.menuItem.create({
      data: {
        name: 'Classic Burger',
        description: 'Beef patty with lettuce, tomato, and cheese',
        price: 12.99,
        category: 'Main Course',
        available: true,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Caesar Salad',
        description: 'Romaine lettuce, croutons, parmesan cheese with caesar dressing',
        price: 8.99,
        category: 'Starters',
        available: true,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'French Fries',
        description: 'Crispy golden fries with sea salt',
        price: 4.99,
        category: 'Sides',
        available: true,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with vanilla frosting',
        price: 6.99,
        category: 'Desserts',
        available: true,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Iced Coffee',
        description: 'Cold brewed coffee served over ice',
        price: 3.99,
        category: 'Beverages',
        available: true,
      },
    }),
  ])

  // Create tables
  const tables = await Promise.all([
    prisma.table.create({
      data: {
        number: 1,
        qrCode: 'table-1-qr',
        occupied: false,
      },
    }),
    prisma.table.create({
      data: {
        number: 2,
        qrCode: 'table-2-qr',
        occupied: false,
      },
    }),
    prisma.table.create({
      data: {
        number: 3,
        qrCode: 'table-3-qr',
        occupied: false,
      },
    }),
  ])

  console.log('Seed data created:', {
    menuItems: menuItems.length,
    tables: tables.length,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
