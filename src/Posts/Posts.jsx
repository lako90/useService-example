import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useServices from '../hooks/useServices';

const Posts = ({ selectedPostId, setSelectedPostId }) => {
  const [{ loading: loadingDelete }, deletePosts] = useServices('posts.delete', { immediate: false });
  const [{ loading: loadingRead, data }, readPosts] = useServices('posts.read');
  const isLoading = loadingDelete || loadingRead;

  const handleSelectClick = (postId) => () => {
    setSelectedPostId(postId);
  };

  const handleDeleteClick = (postId) => async () => {
    setSelectedPostId(null);
    await deletePosts(postId);
    await readPosts();
  };

  if (isLoading) return 'loading...';

  return (
    <Paper sx={{ maxWidth: 600 }}>
      <List>
        {data?.map(({ id, title }) => (
          <ListItem
            key={id}
            disablePadding
            secondaryAction={(
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={handleDeleteClick(id)}
              >
                <DeleteIcon />
              </IconButton>
          )}
          >
            <ListItemButton
              selected={selectedPostId === id}
              onClick={handleSelectClick(id)}
            >
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

Posts.propTypes = {
  selectedPostId: PropTypes.number,
  setSelectedPostId: PropTypes.func.isRequired,
};

Posts.defaultProps = {
  selectedPostId: null,
};

export default Posts;
