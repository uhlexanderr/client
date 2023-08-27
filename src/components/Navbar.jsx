import React, { useState } from 'react';
import { Badge, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Search, ShoppingCartOutlined, ExpandMore, ExitToApp, Person, PersonAdd, AccountCircle } from '@material-ui/icons';
import { styled } from 'styled-components';
import { mobile } from '../responsive';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { logout } from '../redux/userRedux';

const Container = styled('div')`
  height: 60px;
  ${mobile({ height: '70px' })}
`;

const Wrapper = styled('div')`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '10px 0px' })}
`;

const Left = styled('div')`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled('div')`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ display: 'none'})}
`;

const Input = styled('input')`
  border: none;
  font-size: 16px;
  ${mobile({ width: '39px' })}
`;

const Center = styled('div')`
  text-align: center;
`;

const Logo = styled('h1')`
  font-weight: bold;
  ${mobile({ fontSize: '24px', marginLeft: '5px' })}
`;

const Right = styled('div')`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'flex-end' })}
`;

const DropdownWrapper = styled('div')`
  position: relative;
`;

const DropdownMenu = styled(Menu)`
  .MuiMenu-paper {
    width: 150px;
    padding: 0;
  }
`;

const MenuItemLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
`;

const MenuItemIcon = styled('span')`
  margin-right: 8px;
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);
  const [logoutSuccessful, setLogoutSuccessful] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const history = useHistory();
  const location = history.location.pathname;

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setLogoutConfirmationOpen(true);
  };

  const handleLogoutConfirm = () => {
    dispatch(logout());
    localStorage.removeItem('persist:root');
    setLogoutConfirmationOpen(false);
    handleDropdownClose();
    setLogoutSuccessful(true);
  };

  const handleLogoutCancel = () => {
    setLogoutConfirmationOpen(false);
  };

  const handleLogoutAlertClose = () => {
    setLogoutSuccessful(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Perform search functionality using the searchTerm state
    console.log('Searching for:', searchTerm);
    setSearchTerm('');
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Logo>Marasigan Drapery</Logo>
          </NavLink>
        </Left>
        <Center>
          {location !== "/login" && location !== "/register" && location !== "/forgot-password" && location !== "/reset-password/:token" &&(
            <form onSubmit={handleSearchSubmit}>
              <SearchContainer>
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Search style={{ color: 'gray', fontSize: 16 }} />
              </SearchContainer>
            </form>
          )}
        </Center>
        <Right>
          {location !== "/login" && location !== "/register" && location !== "/forgot-password" && location !== "/reset-password/:token" &&(
            <DropdownWrapper>
              <MenuItem onClick={handleDropdownOpen}>
                <MenuItemIcon>
                  <Person />
                </MenuItemIcon>
                {currentUser ? currentUser.username : 'Profile'}
                <ExpandMore style={{ fontSize: 18 }} />
              </MenuItem>
              <DropdownMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleDropdownClose}
              >
                {currentUser ? (
                  [
                    <MenuItem key="username">{currentUser.username}</MenuItem>,
                    <MenuItem key="profile" component={Link} to="/profile" onClick={handleDropdownClose}>
                      Profile Settings
                    </MenuItem>,
                    <MenuItem key="orders" component={Link} to="/orders" onClick={handleDropdownClose}>
                      Your Orders
                     </MenuItem>,
                    <MenuItem key="wishlists" component={Link} to="/wishlist" onClick={handleDropdownClose}>
                      Your Wishlists
                    </MenuItem>,
                    <MenuItem key="logout" onClick={handleLogout}>
                      Logout
                      <ExitToApp style={{ fontSize: 18 }} />
                    </MenuItem>
                  ]
                ) : (
                  [
                    <MenuItemLink key="register" to="/register" onClick={handleDropdownClose}>
                      <MenuItem>
                        <MenuItemIcon>
                          <PersonAdd />
                        </MenuItemIcon>
                        Register
                      </MenuItem>
                    </MenuItemLink>,
                    <MenuItemLink key="login" to="/login" onClick={handleDropdownClose}>
                      <MenuItem>
                        <MenuItemIcon>
                          {/* Updated icon */}
                          <AccountCircle />
                        </MenuItemIcon>
                        Log In
                      </MenuItem>
                    </MenuItemLink>
                  ]
                )}
              </DropdownMenu>
            </DropdownWrapper>
          )}
          {location !== "/login" && location !== "/register" && location !== "/forgot-password" && location !== "/reset-password/:token" &&(
            <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem>
                <Badge
                  overlap="rectangular"
                  badgeContent={quantity}
                  color="primary"
                  style={{ marginTop: '4px' }}
                >
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          )}
        </Right>
      </Wrapper>
      <Dialog open={logoutConfirmationOpen} onClose={handleLogoutCancel}>
        <DialogTitle>Logout Confirmation</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to logout?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={logoutSuccessful} autoHideDuration={3000} onClose={handleLogoutAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleLogoutAlertClose} variant="filled" severity="success">
          Logout Successful
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Navbar;
