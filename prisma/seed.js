const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {

  const school = await prisma.school.create({
    data: {
      name: "SKYELAX Montessori Academy",
      code: "SKY-001",
    },
  });


  const teacher = await prisma.user.create({
    data: {
      name: "Fatima Khan",
      email: "teacher@skyelax.com",
      password: "password123",
      role: "TEACHER",
      schoolId: school.id,
    },
  });


  const parent = await prisma.user.create({
    data: {
      name: "Usman Ali",
      email: "parent@skyelax.com",
      password: "password123",
      role: "PARENT",
      schoolId: school.id,
    },
  });

 
  const student1 = await prisma.student.create({
    data: {
      name: "Ahmad Ali",
      schoolId: school.id,
      parentId: parent.id,
    },
  });

  await prisma.student.create({
    data: {
      name: "Sara Khan",
      schoolId: school.id,
    },
  });


  await prisma.observation.create({
    data: {
      studentId: student1.id,
      category: "SENSORIAL",
      note: "Worked with cylinder blocks showing high concentration.",
      aiInsight: "Demonstrates strong visual-spatial discrimination skills.",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });