import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Malicious URL entry
    await prisma.url.create({
        data: {
            url: 'http://malicious.com',
            isMalicious: true,
            accessCount: 42,
        },
    });

    // Non-malicious URL entry
    await prisma.url.create({
        data: {
            url: 'http://safe.com',
            isMalicious: false,
            accessCount: 10,
        },
    });

    console.log('Seed data has been added successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
