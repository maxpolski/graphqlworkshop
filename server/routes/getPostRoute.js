import Post from '../data/models/post';

export default (req, res) => {
  const { postId } = req.params;

  Post.findById(postId, (err, post) => {
    if (!err && post) {
      return res
              .set('Content-Type', 'application/json')
              .send(JSON.stringify(post));
    }

    return res
            .send('');
  });
};
