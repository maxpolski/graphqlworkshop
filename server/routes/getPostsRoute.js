import Post from '../data/models/post';

export default (req, res) => {
  const {
    pageNum = 1,
  } = req.params;
  const LIMIT = 10;
  const query = Post.find().skip((pageNum - 1) * LIMIT).limit(LIMIT);
  query.exec((err, posts) => {
    if (!err && posts) {
      return res
              .set('Content-Type', 'application/json')
              .send(JSON.stringify(posts));
    }

    return res
            .set('Content-Type', 'application/json')
            .send(JSON.stringify([]));
  });
};
