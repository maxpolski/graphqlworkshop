import Post from '../data/models/post';

export default (req, res) => {
  const { postId } = req.params;

  console.log('postId', postId);

  Post.findById(postId, (err, post) => {
    if (!err && post) {
      return res
              .set('Content-Type', 'application/json')
              .send(JSON.stringify(post));
    }

    console.log('post', post);

    return res
            .send('');
  });
};
