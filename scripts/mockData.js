import connectMongo from '../server/helpers/mongo';
import User from '../server/data/models/user';
import Post from '../server/data/models/post';
import Comment from '../server/data/models/comment';

connectMongo();

const postPreparedData = {
  title: 'Test',
  description: `Lorem ipsum dolor sit amet,
    consectetur adipisicing elit.
    Ipsam deserunt optio perferendis fuga minus ipsum saepe.
    Mollitia culpa eum pariatur quidem doloremque commodi a,
    qui omnis, fugit quo iste doloribus!`,
  mainText: `
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Iusto similique eveniet molestiae accusantium minima,
    quasi cupiditate aperiam ut quas nulla consequuntur earum,
    sunt explicabo, iste magni ad! Magni dolorem reiciendis non necessitatibus mollitia.
    Possimus id quibusdam iusto dolorum aspernatur itaque, suscipit. Illo sint itaque quidem,
    vitae, minus voluptatum? Aliquid, provident. Reiciendis necessitatibus sed minus,
    similique nesciunt assumenda fugiat temporibus unde commodi ex optio iusto quaerat voluptatibus,
    aliquid modi, atque autem nobis ducimus quae dignissimos consectetur in ut quo rem?
    Amet vel architecto fuga provident eveniet minus explicabo dolor
    hic iure aspernatur blanditiis nobis distinctio deleniti in dolorum,
    molestiae ipsum nam unde harum quo ullam laboriosam. Nemo rem distinctio pariatur culpa
    voluptatem dicta error officiis repellat cumque.
    Ad ratione, voluptas. Ipsa vel a quidem ab pariatur porro minima minus aliquam,
    laudantium quos consectetur repellat non officia dignissimos esse possimus, blanditiis,
    nesciunt temporibus necessitatibus fugit. Laboriosam nulla dicta consectetur quaerat necessitatibus,
    ipsa deleniti excepturi hic a atque natus aliquam fugiat, voluptate perferendis, impedit?
    Molestias inventore explicabo voluptates vel voluptas, quae quis. Iure dolorem optio,
    illo ea suscipit praesentium laborum, possimus ad provident dolor voluptatem ex quisquam doloribus,
    quo at, quia debitis! Iste assumenda facere,
    magni vitae aperiam aliquid expedita placeat dolorum molestiae cumque quam obcaecati in,
    quos! Debitis ad exercitationem, tempore ipsa, inventore non deserunt,
    laboriosam dignissimos alias iure sit perspiciatis necessitatibus neque quidem accusamus
    totam placeat modi ab facere illum, reiciendis laborum officia. Odio molestias quam aspernatur
    voluptatem fugiat magni, maiores unde atque, quos voluptatibus nostrum ipsum rerum amet recusandae ut
    corporis dolor odit. Quam minus odit eligendi consectetur, eos sequi dolor, in est beatae,
    explicabo placeat cumque consequatur. Omnis quos minus adipisci, accusamus, qui laboriosam
    cumque nisi consequuntur nam magni ex ipsum animi repudiandae vero neque consequatur eius,
    quis enim perspiciatis cum rem? Veniam eos quidem commodi impedit. Quaerat nesciunt explicabo
    saepe natus impedit aspernatur blanditiis sequi. Deleniti nemo reprehenderit animi.`,
};

const commentPreparedData = {
  text: 'Test test test',
};

const user = new User({ login: 'test', password: 'test', firstName: 'Test', lastName: 'Test' });
user.save((userSaveErr, userData) => {
  console.log('userData', userData);
  const userId = userData.id;
  const comment = new Comment({ ...commentPreparedData, author: userId });
  comment.save((commentSaveData, commentData) => {
    console.log('comment data', commentData);
    const commentId = commentData.id;
    const post = new Post({ ...postPreparedData, author: userId, comments: [commentId] });
    post.save((postSaveErr, postData) => {
      console.log('all is ok', postData);
    });
  });
});
