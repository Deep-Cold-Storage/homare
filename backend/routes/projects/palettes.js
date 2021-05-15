const ProjectService = require('../../services/ProjectService');

async function routes(router) {
  router.register(require('../../hooks/ownerHook'));

  router.get(
    '/:projectId/palettes',
    {
      schema: {
        summary: 'Get project palettes',
        tags: ['Projects - Palettes'],
        security: [{ BearerAuth: [] }],
      },
    },
    async (req, res) => {
      const { projectId } = req.params;

      const palettes = await ProjectService.getPalettes(projectId);

      return res.send(palettes);
    }
  );

  router.post(
    '/:projectId/palettes',
    {
      schema: {
        summary: 'Add project palettes',
        tags: ['Projects - Palettes'],
        security: [{ BearerAuth: [] }],
      },
    },
    async (req, res) => {
      const { projectId } = req.params;
      const { name } = req.body;

      const palettes = await ProjectService.createPalette(projectId, name);

      return res.send(palettes);
    }
  );

  router.patch(
    '/:projectId/palettes/:paletteId',
    {
      schema: {
        summary: 'Update project palette',
        tags: ['Projects - Palettes'],
        security: [{ BearerAuth: [] }],
      },
    },
    async (req, res) => {
      const { projectId, paletteId } = req.params;
      const { name, colors } = req.body;

      const palettes = await ProjectService.updatePallete(projectId, paletteId, name, colors);

      return res.send(palettes);
    }
  );

  router.delete(
    '/:projectId/palettes/:paletteId',
    {
      schema: {
        summary: 'Remove projects palette',
        tags: ['Projects - Palettes'],
        security: [{ BearerAuth: [] }],
      },
    },
    async (req, res) => {
      const { paletteId } = req.params;

      const palettes = await ProjectService.deletePalettes(paletteId);

      return res.send(palettes);
    }
  );
}

module.exports = routes;
