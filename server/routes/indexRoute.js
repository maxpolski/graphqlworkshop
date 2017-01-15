import fs from 'fs';

export default (req, res) => {
  fs.readFile('client/static/index.html', (err, data) => {
    if (!err) {
      res
        .set('Content-Type', 'text/html')
        .send(data);
      return;
    }

    console.error(`Error while reading file ${err}`);
  });
};
