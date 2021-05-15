const ProjectService = require('../services/ProjectService');

async function routes(router) {
  router.register(require('../hooks/authHook'));

  router.get(
    '/',
    {
      schema: {
        summary: "Get all user's projects.",
        tags: ['Projects'],
        security: [{ BearerAuth: [] }],

        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                description: { type: 'string' },
              },
            },
          },
        },
      },
    },
    async (req, res) => {
      const projects = await ProjectService.getUserProjects(req.userId);

      return res.send(projects);
    }
  );

  router.post(
    '/',
    {
      schema: {
        summary: 'Create a new project.',
        tags: ['Projects'],
        security: [{ BearerAuth: [] }],

        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                description: { type: 'string' },
              },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { name, description } = req.body;

      const project = await ProjectService.create(req.userId, name, description);

      return res.send(project);
    }
  );

  router.register(require('./projects/owner'));
  router.register(require('./projects/members'));
}

module.exports = routes;
