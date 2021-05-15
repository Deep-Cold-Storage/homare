const axios = require('axios');

class ColorService {
  async get() {
    let colors;
    let success = true;

    await axios
      .get('http://colormind.io/api/', { data: { model: 'default' } })
      .then((res) => {
        colors = res.data.result;
      })
      .catch(() => {
        success = false;
      });

    return { success, colors };
  }
}

module.exports = new ColorService();
