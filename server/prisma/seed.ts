import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
  // Delete existing data
  await prisma.expense.deleteMany({});
  await prisma.group.deleteMany({});
  await prisma.user.deleteMany({});

  // Create users
  const alice = await prisma.user.create({
    data: {
      username: 'alice',
      password: 'alicepassword',
    },
  });

  const bob = await prisma.user.create({
    data: {
      username: 'bob',
      password: 'bobpassword',
    },
  });

  const charlie = await prisma.user.create({
    data: {
      username: 'charlie',
      password: 'charliepassword',
    },
  });

  const dave = await prisma.user.create({
    data: {
      username: 'dave',
      password: 'davepassword',
    },
  });

  // Create groups
  const groupA = await prisma.group.create({
    data: {
      name: 'Group A',
      creatorId: alice.id,
      participants: {
        connect: [
          { id: alice.id },
          { id: bob.id },
        ],
      },
    },
  });

  const groupB = await prisma.group.create({
    data: {
      name: 'Group B',
      creatorId: bob.id,
      participants: {
        connect: [
          { id: charlie.id },
        ],
      },
    },
  });

  const kolpa = await prisma.group.create({
    data: {
      name: 'Kolpa',
      creatorId: alice.id,
      participants: {
        connect: [
          { id: alice.id },
          { id: bob.id },
          { id: dave.id },
        ],
      },
    },
  });

  const berlin = await prisma.group.create({
    data: {
      name: 'BeRlin',
      creatorId: dave.id,
      participants: {
        connect: [
          { id: dave.id },
        ],
      },
    },
  });

  const prague = await prisma.group.create({
    data: {
      name: 'Prague',
      creatorId: charlie.id,
      participants: {
        connect: [
          { id: charlie.id },
          { id: alice.id },
        ],
      },
    },
  });

  const prague2 = await prisma.group.create({
    data: {
      name: 'Prague 2',
      creatorId: charlie.id,
      participants: {
        connect: [
          { id: charlie.id },
        ],
      },
    },
  });

  // Create expenses
  await prisma.expense.createMany({
    data: [
      { groupId: groupA.id, paidById: alice.id, amountPaid: 100.5, paidFor: 'Unknown Expense', expenseName: 'Unknown Expense' },
      { groupId: groupA.id, paidById: bob.id, amountPaid: 50.0, paidFor: 'Unknown Expense', expenseName: 'Unknown Expense' },
      { groupId: kolpa.id, paidById: bob.id, amountPaid: 75.0, paidFor: 'Unknown Expense', expenseName: 'Unknown Expense' },
      { groupId: kolpa.id, paidById: alice.id, amountPaid: 300.0, paidFor: 'alice, bob, dave', expenseName: 'Kolpa exp 1' },
      { groupId: kolpa.id, paidById: alice.id, amountPaid: 300.0, paidFor: 'alice, bob, dave', expenseName: 'Kolpa exp 2' },
      { groupId: kolpa.id, paidById: alice.id, amountPaid: 1000.0, paidFor: 'alice, bob', expenseName: 'Kolpa exp 3' },
      { groupId: berlin.id, paidById: bob.id, amountPaid: 1000.0, paidFor: 'alice, bob', expenseName: 'Kolpa exp 4' },
      { groupId: prague.id, paidById: alice.id, amountPaid: 1000.0, paidFor: 'alice, bob', expenseName: 'Unknown Expense' },
      { groupId: prague.id, paidById: bob.id, amountPaid: 1000.0, paidFor: 'alice, bob', expenseName: 'Unknown Expense' },
      { groupId: prague.id, paidById: bob.id, amountPaid: 10.005, paidFor: 'bob, alice', expenseName: 'Testiramo! Ponovno testiramo.' },
      { groupId: prague.id, paidById: alice.id, amountPaid: 497.0, paidFor: 'alice, bob', expenseName: 'Blabla, test!' },
    ],
  });
};

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
