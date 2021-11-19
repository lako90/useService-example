import { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Posts from './Posts';
import Messages from './Messages';

const useStyles = makeStyles(({ spacing }) => ({
  appContainer: {
    padding: spacing(10, 0),
    backgroundColor: '#8693ab',
    backgroundImage: 'linear-gradient(315deg, #8693ab 0%, #bdd4e7 74%)',
    minHeight: '100vh',
  },
}));

const App = () => {
  const { appContainer } = useStyles();
  const [selectedPostId, setSelectedPostId] = useState();

  return (
    <Box className={appContainer}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Posts
              selectedPostId={selectedPostId}
              setSelectedPostId={setSelectedPostId}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Messages postId={selectedPostId} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default App;
