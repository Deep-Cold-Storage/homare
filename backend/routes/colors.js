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

      console.log(colors);

      return res.send(colors);
    }
  );
}

module.exports = routes;
