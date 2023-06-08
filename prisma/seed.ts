import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  Array.from({ length: 100 }).forEach(async (_, i) => {
    await prisma.track.upsert({
      where: { id: (i + 1).toString() },
      update: {},
      create: {
        id: (i + 1).toString(),
        title: `Track ${i + 1}`,
        artist: `Artist ${i + 1}`,
        album: `Album ${i + 1}`,
        genre: `Genre ${i + 1}`,
        releaseYear: 2021,
        duration: 100,
      },
    });
  });

  Array.from({ length: 100 }).forEach(async (_, i) => {
    await prisma.playlist.upsert({
      where: { id: (i + 1).toString() },
      update: {},
      create: {
        id: (i + 1).toString(),
        name: `Playlist ${i + 1}`,
        description: `Description ${i + 1}`,
      },
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
