import React from 'react';
import {connect} from 'react-redux';

import Navbar from "../../components/Navigation/Navbar/Navbar";
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import styled from 'styled-components';

const MainWrapper = styled.div `
  width: 100%;
  min-height: calc(100vh - 6rem);
  margin-top: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Layout = ({children, loggedIn}) => (
  <React.Fragment>
    <Navbar loggedIn={loggedIn} />
    <SideDrawer loggedIn={loggedIn} />
    <MainWrapper>{children}</MainWrapper>
  </React.Fragment>
);

const mapStateToProps = ({firebase}) => ({
  loggedIn: firebase.auth,
});

export default connect(mapStateToProps)(Layout);