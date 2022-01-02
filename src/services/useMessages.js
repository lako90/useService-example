import useServices from '../hooks/useServices';

const useMessages = () => {
  const [{ loading, data }, readComments] = useServices('posts.comments', { immediate: false });

  return [{ loading, data }, { readComments }];
};

export default useMessages;
