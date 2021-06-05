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
      },
    },
    async (req, res) => {
      const projects = await ProjectService.getUserProjects(req.userId);

      return res.send(projects);
    }
  );

  router.get(
    '/:projectId',
    {
      schema: {
        summary: "Get user's project by ID",
        tags: ['Projects'],
        security: [{ BearerAuth: [] }],
      },
    },
    async (req, res) => {
      const { projectId } = req.params;

      const project = await ProjectService.getUserProject(req.userId, projectId);

      return res.send(project);
    }
  );

  router.post(
    '/',
    {
      schema: {
        summary: 'Create a new project.',
        tags: ['Projects'],
        security: [{ BearerAuth: [] }],

        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
          },
        },

        response: {
          200: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              description: { type: 'string' },
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
  router.register(require('./projects/palettes'));
}

module.exports = routes;
