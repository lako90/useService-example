import { useMemo } from 'react';
import useServices from '../hooks/useServices';

const usePosts = () => {
  const [{ loading: loadingDelete }, deletePosts] = useServices('posts.delete', { immediate: false });
  const [{ loading: loadingRead, data }, readPosts] = useServices('posts.read');
  const loading = useMemo(() => loadingDelete || loadingRead, [loadingDelete, loadingRead]);

  return [{ data, loading }, { readPosts, deletePosts }];
};

export default usePosts;
