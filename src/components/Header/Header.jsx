import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  TextField,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useAuth } from '../../contexts/useAuthContext';

const Header = () => {
  const { signin } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { user, password } = event.target.elements;

    signin(user.value, password.value);
  };

  return (
    <AppBar position="static">
      <form onSubmit={handleSubmit}>
        <Toolbar variant="dense">
          <Grid
            container
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <TextField
                name="user"
                placeholder="user"
                variant="standard"
                size="small"
              />
            </Grid>
            <Grid item>
              <TextField
                name="password"
                placeholder="password"
                type="password"
                variant="standard"
                size="small"
              />
            </Grid>
            <Grid item>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                type="submit"
                sx={{ mr: 2 }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </form>
    </AppBar>
  );
};

export default Header;
