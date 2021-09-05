import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from '@emotion/styled';
import { translate } from 'react-polyglot';
import { searchCollections } from '../../actions/collections';
import CollectionSearch from './CollectionSearch';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  font-size: 18px;
  line-height: 24px;
  border: 1px solid #ececf1;
  border-radius: 4px;
`;

export class Search extends React.Component {
  static propTypes = {
    collections: ImmutablePropTypes.map.isRequired,
    collection: ImmutablePropTypes.map,
    isSearchEnabled: PropTypes.bool,
    searchTerm: PropTypes.string,
    filterTerm: PropTypes.string,
    t: PropTypes.func.isRequired,
  };

  render() {
    const { collections, collection, isSearchEnabled, searchTerm } = this.props;
    return (
      <Container>
        {isSearchEnabled && (
          <CollectionSearch
            searchTerm={searchTerm}
            collections={collections}
            collection={collection}
            onSubmit={(query, collection) => searchCollections(query, collection)}
          />
        )}
      </Container>
    );
  }
}

export default translate()(Search);
