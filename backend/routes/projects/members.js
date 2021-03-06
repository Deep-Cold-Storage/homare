const ProjectService = require('../../services/ProjectService');

async function routes(router) {
  router.register(require('../../hooks/ownerHook'));

  router.get(
    '/:projectId/members',
    {
      schema: {
        summary: "Get project's members.",
        tags: ['Projects - Members'],
        security: [{ BearerAuth: [] }],
      },
    },
    async (req, res) => {
      const { projectId } = req.params;

      const members = await ProjectService.getMembers(projectId);

      return res.send(members);
    }
  );

  router.post(
    '/:projectId/members',
    {
      schema: {
        summary: 'Add a member to the project.',
        tags: ['Projects - Members'],
        security: [{ BearerAuth: [] }],
      },
    },
    async (req, res) => {
      const { projectId } = req.params;
      const { email } = req.body;

      const members = await ProjectService.createMember(projectId, email);

      return res.send(members);
    }
  );

  router.delete(
    '/:projectId/members/:memberId',
    {
      schema: {
        summary: 'Remove member from the project',
        tags: ['Projects - Members'],
        security: [{ BearerAuth: [] }],
      },
    },
    async (req, res) => {
      const { projectId, memberId } = req.params;

      const members = await ProjectService.removeMember(projectId, memberId);

      return res.send(members);
    }
  );
}

module.exports = routes;
