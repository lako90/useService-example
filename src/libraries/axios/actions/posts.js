const actions = {
  create: 'POST posts',
  read: 'GET posts/:postId',
  update: 'PUT posts/:postId',
  delete: 'DELETE posts/:postId',
  comments: 'GET posts/:postId/comments',
};

export default actions;
