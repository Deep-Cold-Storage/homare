const app = (fastify = require('fastify')({
  logger: { level: 'warn' },
}));

app.register(require('fastify-swagger'), {
  routePrefix: '/docs',
  exposeRoute: true,

  openapi: {
    info: {
      title: 'Homare - API Service',
      description: '🌈 Application for building and sharing project color schemes.',
      version: '0.1.0',
    },
    tags: [
      { name: 'Users', description: '👱 User management endpoints.' },
      { name: 'Auth', description: '🔒 User authentication endpoints.' },
      { name: 'Colors', description: '🌈 Colors management endpoints.' },
      { name: 'Projects', description: '📚 Project management endpoints.' },
      { name: 'Projects - Members', description: "📕 Project's members management endpoints." },
      { name: 'Projects - Palettes', description: "📗 Project's palettes management endpoints." },
    ],
    servers: [
      { url: 'http://127.0.0.1:3000', description: 'Development' },
      { url: 'https://homare.bednarski.dev/api', description: 'Production' },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
  },
});

const colors = require('./routes/colors');
const projects = require('./routes/projects');
const users = require('./routes/users');
const auth = require('./routes/auth');

app.register(colors, { prefix: '/colors' });
app.register(projects, { prefix: '/projects' });
app.register(users, { prefix: '/users' });
app.register(auth, { prefix: '/auth' });

module.exports = app;
