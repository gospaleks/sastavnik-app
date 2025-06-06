const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.BASE_URL,
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/api/*', '/sastavi/[essayId]/izmena'],

  additionalPaths: async (config) => {
    // Pribavi iz baze podataka sve objavljene eseje i kategorije za generisanje dinamickih ruta u sitemap
    const essays = await prisma.essay.findMany({
      select: {
        id: true,
      },
      where: {
        published: true,
      },
    });

    const categories = await prisma.category.findMany({
      select: {
        name: true,
      },
    });

    // Mapiraj eseje na sitemap rute
    const essayPaths = essays.map((essay) => ({
      loc: `/sastavi/${essay.id}`,
      lastmod: new Date().toISOString(),
    }));

    // Mapiraj kategorije na sitemap rute
    const categoryPaths = categories.map((cat) => ({
      loc: `/kategorije/${cat.name}`,
      lastmod: new Date().toISOString(),
    }));

    // Dodaj staticke rute
    const staticPaths = [
      { loc: '/privatnost', lastmod: new Date().toISOString() },
      { loc: '/o-nama', lastmod: new Date().toISOString() },
    ];

    return [...essayPaths, ...categoryPaths, ...staticPaths];
  },
};

module.exports = config;
