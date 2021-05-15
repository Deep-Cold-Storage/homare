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
      const { success, colors } = await ColorService.get();

      if (success) {
        return res.send(colors);
      }

      return res.code(503).send({ msg: 'Colormind API is currently unavailable. Try again later.' });
    }
  );
}

module.exports = routes;
