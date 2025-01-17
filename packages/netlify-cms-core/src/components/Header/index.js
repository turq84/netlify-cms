import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { translate } from 'react-polyglot';
import { NavLink } from 'react-router-dom';
import { colors, lengths, buttons, zIndex } from 'netlify-cms-ui-default';
import { connect } from 'react-redux';
import { SettingsDropdown } from '../UI';
import { checkBackendStatus } from '../../actions/status';
import { earnerCMS as EarnerCMS } from './SVG';

function AppHeader(props) {
  return <Header {...props} />;
}

const Header = styled.header`
  position: sticky;
  top: 0;
  background-color: ${colors.foreground};
  z-index: ${zIndex.zIndex300};
  height: ${lengths.topBarHeight};
  width: 1072px;
  margin: auto;
`;

const AppHeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 800px;
  max-width: 1440px;
  margin: 0 auto;
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
  transition: all 0.25s linear 0s;

  &:hover,
  &:active,
  &:focus {
    color: #10a37f;
    transition: all 0.25s linear 0s;
  }

  ${props => css`
    &.${props.activeClassName} {
      color: #10a37f;
      transition: all 0.25s linear 0s;
    }
  `};
`;

const AppHeaderNavLink = AppHeaderButton.withComponent(NavLink);

const AppHeaderActions = styled.div`
  display: inline-flex;
  align-items: center;
`;

const AppHeaderNavList = styled.ul`
  display: flex;
  margin: 0;
  list-style: none;
  align-items: center;
`;

const IconContainer = styled.span`
  margin-right: 16px;
  height: 50px;
`;

class HeaderComponent extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    collections: ImmutablePropTypes.map.isRequired,
    onCreateEntryClick: PropTypes.func.isRequired,
    onLogoutClick: PropTypes.func.isRequired,
    openMediaLibrary: PropTypes.func.isRequired,
    hasWorkflow: PropTypes.bool.isRequired,
    displayUrl: PropTypes.string,
    isTestRepo: PropTypes.bool,
    t: PropTypes.func.isRequired,
    checkBackendStatus: PropTypes.func.isRequired,
  };

  intervalId;

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.props.checkBackendStatus();
    }, 5 * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  // handleCreatePostClick = collectionName => {
  //   const { onCreateEntryClick } = this.props;
  //   if (onCreateEntryClick) {
  //     onCreateEntryClick(collectionName);
  //   }
  // };

  render() {
    const {
      user,
      onLogoutClick,
      openMediaLibrary,
      hasWorkflow,
      displayUrl,
      isTestRepo,
      t,
      showMediaButton,
    } = this.props;

    return (
      <AppHeader>
        <AppHeaderContent>
          <nav>
            <AppHeaderNavList>
              <li>
                {/* <img src={earnerLogo} alt="Earner CMS" /> */}
                <IconContainer>
                  <EarnerCMS />
                </IconContainer>
              </li>
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
                    {t('app.header.workflow')}
                  </AppHeaderNavLink>
                </li>
              )}
              {showMediaButton && (
                <li>
                  <AppHeaderButton onClick={openMediaLibrary}>
                    {t('app.header.media')}
                  </AppHeaderButton>
                </li>
              )}
            </AppHeaderNavList>
          </nav>
          <AppHeaderActions>
            <SettingsDropdown
              displayUrl={displayUrl}
              isTestRepo={isTestRepo}
              imageUrl={user?.avatar_url}
              onLogoutClick={onLogoutClick}
            />
          </AppHeaderActions>
        </AppHeaderContent>
      </AppHeader>
    );
  }
}

const mapDispatchToProps = {
  checkBackendStatus,
};

export default connect(null, mapDispatchToProps)(translate()(HeaderComponent));
