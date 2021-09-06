import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { translate } from 'react-polyglot';
import { lengths, components } from 'netlify-cms-ui-default';

import { getNewEntryUrl } from '../../lib/urlHelper';
import Search from './Search';
import CollectionTop from './CollectionTop';
import EntriesCollection from './Entries/EntriesCollection';
import EntriesSearch from './Entries/EntriesSearch';
import CollectionControls from './CollectionControls';
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
  width: 1072px;
  margin: 50px auto;
`;

const CollectionMain = styled.main``;

const SearchResultContainer = styled.div`
  padding: 18px 20px;
  margin-bottom: 28px;
  border-bottom: 1px solid #ececf1;
`;

const SearchResultHeading = styled.h1`
  ${components.cardTopHeading};
`;

const SearchFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: max-content;
  margin: auto;
`;

export class Collection extends React.Component {
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
    const {
      collection,
      collections,
      collectionName,
      isSearchEnabled,
      isSearchResults,
      isSingleSearchResult,
      searchTerm,
      sortableFields,
      onSortClick,
      sort,
      viewFilters,
      viewGroups,
      filterTerm,
      t,
      onFilterClick,
      onGroupClick,
      filter,
      group,
      onChangeViewStyle,
      viewStyle,
    } = this.props;

    let newEntryUrl = collection.get('create') ? getNewEntryUrl(collectionName) : '';
    if (newEntryUrl && filterTerm) {
      newEntryUrl = getNewEntryUrl(collectionName);
      if (filterTerm) {
        newEntryUrl = `${newEntryUrl}?path=${filterTerm}`;
      }
    }

    const searchResultKey =
      'collection.collectionTop.searchResults' + (isSingleSearchResult ? 'InCollection' : '');

    return (
      <CollectionContainer>
        <CollectionMain>
          {isSearchResults ? (
            <SearchResultContainer>
              <SearchResultHeading>
                {t(searchResultKey, { searchTerm, collection: collection.get('label') })}
              </SearchResultHeading>
              <Search
                collections={collections}
                collection={(!isSearchResults || isSingleSearchResult) && collection}
                isSearchEnabled={isSearchEnabled}
                searchTerm={searchTerm}
                filterTerm={filterTerm}
              />
            </SearchResultContainer>
          ) : (
            <>
              <CollectionTop collection={collection} newEntryUrl={newEntryUrl} />
              <SearchFilterContainer>
                <Search
                  collections={collections}
                  collection={(!isSearchResults || isSingleSearchResult) && collection}
                  isSearchEnabled={isSearchEnabled}
                  searchTerm={searchTerm}
                  filterTerm={filterTerm}
                />
                <CollectionControls
                  viewStyle={viewStyle}
                  onChangeViewStyle={onChangeViewStyle}
                  sortableFields={sortableFields}
                  onSortClick={onSortClick}
                  sort={sort}
                  viewFilters={viewFilters}
                  viewGroups={viewGroups}
                  t={t}
                  onFilterClick={onFilterClick}
                  onGroupClick={onGroupClick}
                  filter={filter}
                  group={group}
                />
              </SearchFilterContainer>
            </>
          )}

          {isSearchResults ? this.renderEntriesSearch() : this.renderEntriesCollection()}
        </CollectionMain>
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

const ConnectedCollection = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Collection);

export default translate()(ConnectedCollection);
