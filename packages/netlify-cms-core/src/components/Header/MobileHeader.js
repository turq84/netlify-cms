/* eslint-disable func-style */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { NavLink } from 'react-router-dom';
import { colors, lengths, buttons, zIndex } from 'netlify-cms-ui-default';
import { Menu as MenuIcon } from './SVG';

const MobileHeader = props => {
  const {
    user,
    collections,
    onCreateEntryClick,
    onLogoutClick,
    openMediaLibrary,
    hasWorkflow,
    displayUrl,
    isTestRepo,
    t,
    checkBackendStatus,
    showMediaButton,
  } = props;
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const Container = styled.div`
    display: none;
    flex-direction: column;
    transition: all 0.5s ease-in-out;
    position: fixed;
    z-index: 4;
    background-color: #fff;
    width: 100%;
    box-shadow: 0px 3px 6px #0000000b;

    @media (min-width: 550px) {
      display: flex;
    }
  `;

  const MenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 75px;
    width: 90%;
    margin: auto;

    a {
      height: 100px;
    }

    @media (min-width: 550px) {
      width: 100%;

      a {
        height: 90px;
      }
    }
  `;

  const MenuContent = styled.div`
    z-index: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    position: fixed;
    opacity: 0;
    visibility: hidden;
    height: 0%;
    transition: opacity 0.75s, visibility 0.75s, height 0.75s;
    overflow: hidden;
    margin-top: 50px;
    box-shadow: 0px 3px 6px #0000000b;

    &.isOpen {
      opacity: 1;
      visibility: visible;
      height: 500px;
    }
  `;

  const MobileImage = styled.img`
    width: 300px;
    margin-top: 35px;
    margin-left: 20px;

    //   @media ${devices.mobileXL} {
    //     width: 200px;
    //   }
  `;

  const UL = styled.ul`
    @media (min-width: 550px) {
      text-align: center;
    }
  `;

  const NavItem = styled.li`
    list-style-type: none;
    margin-right: 20px;

    &:last-child {
      margin-right: 0px;
    }

    @media (min-width: 550px) {
      margin-right: 45px;
    }
  `;

  const MobileNavItem = styled.li`
    line-height: 44px;
    margin-left: 40%;

    @media (min-width: 768px) {
      margin-left: 0;
    }
  `;

  // const NavLink = styled(Link)`
  //   text-decoration: none;
  //   font-size: ${props => props.theme.sizing.default};
  //   color: ${props => props.theme.colors.black};

  //   &.active {
  //     border-bottom: 1px solid ${p => p.theme.colors.primary};
  //   }
  // `;

  const IconContainer = styled.span`
    margin-right: 16px;
  `;

  const AppHeaderButton = styled.button`
    ${buttons.button};
    background: none;
    color: #000;
    font-family: inherit;
    font-size: 14px;
    font-weight: 400;
    display: inline-flex;
    padding: 16px 20px;
    align-items: center;

    &:hover,
    &:active,
    &:focus {
      font-weight: 600;
    }

    ${props => css`
      &.${props.activeClassName} {
        font-weight: 600;
      }
    `};
  `;

  const AppHeaderNavLink = AppHeaderButton.withComponent(NavLink);

  return (
    <Container>
      <MenuContainer>
        {/* <Link to="/">
          <MobileImage src={Logo} alt="Aatos Perheklinikka" />
        </Link> */}

        <IconContainer onClick={toggleMenu}>
          <MenuIcon />
        </IconContainer>
      </MenuContainer>
      <MenuContent isOpen={showMenu} className={showMenu ? 'isOpen' : ''}>
        <UL>
          <li>Logo</li>
          <li>
            <AppHeaderNavLink
              to="/dashboard"
              activeClassName="header-link-active"
              isActive={(match, location) => location.pathname.startsWith('/dashboard/')}
            >
              Dashboard
            </AppHeaderNavLink>
          </li>
          {hasWorkflow && (
            <li>
              <AppHeaderNavLink to="/workflow" activeClassName="header-link-active">
                Workflow
              </AppHeaderNavLink>
            </li>
          )}
          {showMediaButton && (
            <li>
              <AppHeaderButton onClick={openMediaLibrary}>Media</AppHeaderButton>
            </li>
          )}
        </UL>
      </MenuContent>
    </Container>
  );
};

export default MobileHeader;
