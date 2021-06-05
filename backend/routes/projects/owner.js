const ProjectService = require('../../services/ProjectService');

async function routes(router) {
  router.register(require('../../hooks/ownerHook'));

  router.patch(
    '/:projectId',
    {
      schema: {
        summary: 'Update project name and description.',
        tags: ['Projects'],
        security: [{ BearerAuth: [] }],
      },
    },
    async (req, res) => {
      const { projectId } = req.params;
      const { name, description } = req.body;

      const project = await ProjectService.update(projectId, name, description);

      return res.send(project);
    }
  );

  router.delete(
    '/:projectId',
    {
      schema: {
        summary: "Delete user's project.",
        tags: ['Projects'],
        security: [{ BearerAuth: [] }],
      },
    },
    async (req, res) => {
      const { projectId } = req.params;

      await ProjectService.delete(projectId);

      return res.code(204).send('');
    }
  );
}

module.exports = routes;
