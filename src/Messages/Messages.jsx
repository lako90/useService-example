import { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
} from '@mui/material';
import useServices from '../hooks/useServices';

const Messages = ({ postId }) => {
  const [{ loading, data }, readComments] = useServices('posts.comments', { immediate: false });

  useEffect(() => {
    if (postId) {
      readComments(postId);
    }
  }, [postId]);

  if (loading && !data) return 'loading...';
  if (!postId) return 'select a post';
  if (!data) return 'no data';

  return (
    <Paper>
      <List>
        {data?.map(({ id, body, name }, index) => (
          <Fragment key={id}>
            {index > 0 && <Divider />}
            <ListItem>
              <ListItemText primary={body} secondary={name} />
            </ListItem>
          </Fragment>
        ))}
      </List>
    </Paper>
  );
};

Messages.propTypes = {
  postId: PropTypes.number,
};

Messages.defaultProps = {
  postId: null,
};

export default Messages;
