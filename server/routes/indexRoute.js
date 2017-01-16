import fs from 'fs';

export default (req, res) => {
  console.log('isAuthorized', req.isAuthorized);
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
