import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Icon from './Icon';
import { colors, lengths, buttons } from './styles';

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 26px;
  border-radius: ${lengths.borderRadius} ${lengths.borderRadius} 0 0;
  position: relative;
`;

const TopBarButton = styled.button`
  border-radius: 0px;
  border: none;
  background: #fff;
  font-size: 16px;
  line-height: 1;
  padding: 0;
  width: 32px;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.textFieldBorder};

  &:hover {
    background-color: #fff;
  }
`;

const TopBarButtonSpan = TopBarButton.withComponent('span');

const DragIconContainer = styled(TopBarButtonSpan)`
  width: 100%;
  cursor: move;
`;

function DragHandle({ dragHandleHOC }) {
  const Handle = dragHandleHOC(() => (
    <DragIconContainer className={'accordion'}>
      <Icon type="drag-handle" size="small" />
    </DragIconContainer>
  ));
  return <Handle />;
}

function ListItemTopBar({ className, collapsed, onCollapseToggle, onRemove, dragHandleHOC }) {
  return (
    <TopBar className={className}>
      {onCollapseToggle ? (
        <TopBarButton onClick={onCollapseToggle} className={'accordion'}>
          <Icon type="chevron" size="small" direction={collapsed ? 'right' : 'down'} />
        </TopBarButton>
      ) : null}
      {dragHandleHOC ? <DragHandle dragHandleHOC={dragHandleHOC} /> : null}
      {onRemove ? (
        <TopBarButton onClick={onRemove} className={'accordion'}>
          <Icon type="close" size="small" />
        </TopBarButton>
      ) : null}
    </TopBar>
  );
}

ListItemTopBar.propTypes = {
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  onCollapseToggle: PropTypes.func,
  onRemove: PropTypes.func,
};

const StyledListItemTopBar = styled(ListItemTopBar)`
  display: flex;
  justify-content: space-between;
  height: 26px;
  border-radius: ${lengths.borderRadius} ${lengths.borderRadius} 0 0;
  position: relative;
`;

export default StyledListItemTopBar;
