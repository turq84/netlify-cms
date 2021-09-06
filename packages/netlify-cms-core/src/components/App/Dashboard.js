import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { translate } from 'react-polyglot';
import { lengths } from 'netlify-cms-ui-default';
import { NavLink } from 'react-router-dom';
import { getNewEntryUrl } from '../../lib/urlHelper';
import EntriesCollection from '../Collection/Entries/EntriesCollection';
import EntriesSearch from '../Collection/Entries/EntriesSearch';
import { sortByField, filterByField, changeViewStyle, groupByField } from '../../actions/entries';
import {
  selectSortableFields,
  selectViewFilters,
  selectViewGroups,
} from '../../reducers/collections';
import {
  selectEntriesSort,
  selectEntriesFilter,
  selectEntriesGroup,
  selectViewStyle,
} from '../../reducers/entries';

const CollectionContainer = styled.div`
  margin: ${lengths.pageMargin};
`;

export class Dashboard extends React.Component {
  static propTypes = {
    searchTerm: PropTypes.string,
    collectionName: PropTypes.string,
    isSearchResults: PropTypes.bool,
    isSingleSearchResult: PropTypes.bool,
    collection: ImmutablePropTypes.map.isRequired,
    collections: ImmutablePropTypes.map.isRequired,
    sortableFields: PropTypes.array,
    sort: ImmutablePropTypes.orderedMap,
    onSortClick: PropTypes.func.isRequired,
  };

  renderEntriesCollection = () => {
    const { collection, filterTerm, viewStyle } = this.props;
    return (
      <EntriesCollection collection={collection} viewStyle={viewStyle} filterTerm={filterTerm} />
    );
  };

  renderEntriesSearch = () => {
    const { searchTerm, collections, collection, isSingleSearchResult } = this.props;
    return (
      <EntriesSearch
        collections={isSingleSearchResult ? collections.filter(c => c === collection) : collections}
        searchTerm={searchTerm}
      />
    );
  };

  render() {
    const { collection, collections, collectionName, filterTerm } = this.props;

    let newEntryUrl = collection.get('create') ? getNewEntryUrl(collectionName) : '';
    if (newEntryUrl && filterTerm) {
      newEntryUrl = getNewEntryUrl(collectionName);
      if (filterTerm) {
        newEntryUrl = `${newEntryUrl}?path=${filterTerm}`;
      }
    }

    console.log('Collection data: ', collections);

    return (
      <CollectionContainer>
        <Container>
          <h1>Welcome!</h1>
          <h2>Get Started</h2>
          <p>To get started, pick a collection below that you would like to add or update.</p>
          <p>
            Do you want to write a blog post? Great! Click the <i>Posts</i> collection, below. If
            you want to add yourself as an author, visit the <i>Settings</i> collection and then
            click <i>Authors</i>. From there, click "Add author".
          </p>

          <CollectionCardContainer>
            {collections.toIndexedSeq().map((collection, index) => {
              const collectionName = collection.get('name');

              return (
                <CollectionCard key={index} to={`/collections/${collectionName}`}>
                  <CollectionTitle>{collection.get('label')}</CollectionTitle>
                  <CollectionDesc>{collection.get('description')}</CollectionDesc>
                </CollectionCard>
              );
            })}
          </CollectionCardContainer>
        </Container>
      </CollectionContainer>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { collections } = state;
  const isSearchEnabled = state.config && state.config.search != false;
  const { isSearchResults, match, t } = ownProps;
  const { name, searchTerm = '', filterTerm = '' } = match.params;
  const collection = name ? collections.get(name) : collections.first();
  const sort = selectEntriesSort(state.entries, collection.get('name'));
  const sortableFields = selectSortableFields(collection, t);
  const viewFilters = selectViewFilters(collection);
  const viewGroups = selectViewGroups(collection);
  const filter = selectEntriesFilter(state.entries, collection.get('name'));
  const group = selectEntriesGroup(state.entries, collection.get('name'));
  const viewStyle = selectViewStyle(state.entries);

  return {
    collection,
    collections,
    collectionName: name,
    isSearchEnabled,
    isSearchResults,
    searchTerm,
    filterTerm,
    sort,
    sortableFields,
    viewFilters,
    viewGroups,
    filter,
    group,
    viewStyle,
  };
}

const mapDispatchToProps = {
  sortByField,
  filterByField,
  changeViewStyle,
  groupByField,
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...ownProps,
    onSortClick: (key, direction) =>
      dispatchProps.sortByField(stateProps.collection, key, direction),
    onFilterClick: filter => dispatchProps.filterByField(stateProps.collection, filter),
    onGroupClick: group => dispatchProps.groupByField(stateProps.collection, group),
    onChangeViewStyle: viewStyle => dispatchProps.changeViewStyle(viewStyle),
  };
}

const ConnectedCollection = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Dashboard);

export default translate()(ConnectedCollection);

const Container = styled.div`
  width: 1072px;
  margin: 50px auto;

  @media (min-width: 550px) {
    width: 100%;
  }
`;

const CollectionCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;

  @media (min-width: 550px) {
    flex-direction: column;
    width: 100%;
  }
`;

const CollectionCard = styled(NavLink)`
  border-radius: 5px;
  padding: 20px 15px;
  border: 1px solid #ececf1;
  flex: 0 0 30%;
  margin: 12px 0px;
  height: max-content;
  transition: all 0.25s linear 0s;

  &:hover {
    box-shadow: 9px 9px 22px -2px rgba(163, 177, 198, 0.5), -9px -9px 18px hsla(0, 0%, 100%, 0.52);
    transition: all 0.25s linear 0s;
    border: 1px solid transparent;
  }

  @media (min-width: 550px) {
    flex: 0 0 100%;
  }
`;

const CollectionTitle = styled.div`
  margin-top: 12px;
  color: #000;
  line-height: 24px;
  font-size: 18px;
  font-weight: 700;
`;

const CollectionDesc = styled.p`
  line-height: 1;
  margin-top: 4px;
`;
