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
import usePosts from '../../services/usePosts';

const Posts = ({ selectedPostId, setSelectedPostId }) => {
  const [{ loading, data }, { deletePosts, readPosts }] = usePosts();

  const handleSelectClick = (postId) => () => {
    setSelectedPostId(postId);
  };

  const handleDeleteClick = (postId) => async () => {
    setSelectedPostId(null);
    await deletePosts(postId);
    await readPosts();
  };

  if (loading) return 'loading...';

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
