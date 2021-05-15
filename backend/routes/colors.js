const ColorService = require('../services/ColorService');

async function routes(router) {
  router.get(
    '/',
    {
      schema: {
        summary: 'Generate color pallete.',
        tags: ['Colors'],
      },
    },
    async (req, res) => {
      const colors = await ColorService.get();

      return res.send(colors);
    }
  );
}

module.exports = routes;
