const axios = require('axios');

class ColorService {
  async get() {
    let colors;

    await axios.get('http://colormind.io/api/', { data: { model: 'default' } }).then((res) => {
      colors = res.data.result;
    });

    return colors;
  }
}

module.exports = new ColorService();
