import React from 'react';
import styled from '@emotion/styled';
import { colorsRaw, colors, Icon, lengths, zIndex } from 'netlify-cms-ui-default';
import { translate } from 'react-polyglot';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const SearchContainer = styled.div`
  position: relative;

  ${Icon} {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: ${zIndex.zIndex2};
    height: 100%;
    display: flex;
    align-items: center;
    pointer-events: none;
    color: #000;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input`
  background-color: #fff;
  border-radius: ${lengths.borderRadius};
  font-size: 18px;
  padding: 10px 6px 10px 32px;
  width: 100%;
  position: relative;
  z-index: ${zIndex.zIndex1};
  font-weight: 300;
`;

const SuggestionsContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Suggestions = styled.ul`
  position: absolute;
  top: 6px;
  left: 0px;
  right: 0px;
  padding: 10px 0;
  margin: 0;
  list-style: none;
  background-color: #fff;
  border-radius: ${lengths.borderRadius};
  border: 1px solid ${colors.textFieldBorder};
  z-index: ${zIndex.zIndex2};
`;

const SuggestionHeader = styled.li`
  padding: 0px 6px 6px 32px;
  font-size: 12px;
  color: ${colors.text};
`;

const SuggestionItem = styled.li`
  color: ${colorsRaw.grayDark};
  background-color: inherit;
  padding: 6px 6px 6px 32px;
  cursor: pointer;
  position: relative;

  &:hover {
    color: ${colors.active};
    background-color: ${colors.activeBackground};
  }
`;

const SuggestionDivider = styled.div`
  width: 100%;
`;

class CollectionSearch extends React.Component {
  static propTypes = {
    // collections: ImmutablePropTypes.map.isRequired,
    collection: ImmutablePropTypes.map,
    searchTerm: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  state = {
    query: this.props.searchTerm,
    suggestionsVisible: false,
    // default to the currently selected
    selectedCollectionIdx: this.getSelectedSelectionBasedOnProps(),
  };

  componentDidUpdate(prevProps) {
    if (prevProps.collection !== this.props.collection) {
      const selectedCollectionIdx = this.getSelectedSelectionBasedOnProps();
      this.setState({ selectedCollectionIdx });
    }
  }

  getSelectedSelectionBasedOnProps() {
    const { collection, collections } = this.props;
    return collection ? collections.keySeq().indexOf(collection.get('name')) : -1;
  }

  toggleSuggestions(visible) {
    this.setState({ suggestionsVisible: visible });
  }

  selectNextSuggestion() {
    const { collections } = this.props;
    const { selectedCollectionIdx } = this.state;
    this.setState({
      selectedCollectionIdx: Math.min(selectedCollectionIdx + 1, collections.size - 1),
    });
  }

  selectPreviousSuggestion() {
    const { selectedCollectionIdx } = this.state;
    this.setState({
      selectedCollectionIdx: Math.max(selectedCollectionIdx - 1, -1),
    });
  }

  resetSelectedSuggestion() {
    this.setState({
      selectedCollectionIdx: -1,
    });
  }

  submitSearch = () => {
    const { onSubmit, collections } = this.props;
    const { selectedCollectionIdx, query } = this.state;

    this.toggleSuggestions(false);
    if (selectedCollectionIdx !== -1) {
      onSubmit(query, collections.toIndexedSeq().getIn([selectedCollectionIdx, 'name']));
    } else {
      onSubmit(query);
    }
  };

  handleKeyDown = event => {
    const { suggestionsVisible } = this.state;

    if (event.key === 'Enter') {
      this.submitSearch();
    }

    if (suggestionsVisible) {
      // allow closing of suggestions with escape key
      if (event.key === 'Escape') {
        this.toggleSuggestions(false);
      }

      if (event.key === 'ArrowDown') {
        this.selectNextSuggestion();
        event.preventDefault();
      } else if (event.key === 'ArrowUp') {
        this.selectPreviousSuggestion();
        event.preventDefault();
      }
    }
  };

  handleQueryChange = query => {
    this.setState({ query });
    this.toggleSuggestions(query !== '');
    if (query === '') {
      this.resetSelectedSuggestion();
    }
  };

  handleSuggestionClick = (event, idx) => {
    this.setState({ selectedCollectionIdx: idx }, this.submitSearch);
    event.preventDefault();
  };

  render() {
    const { collections, t } = this.props;
    const { suggestionsVisible, query } = this.state;
    return (
      <SearchContainer
        onBlur={() => this.toggleSuggestions(false)}
        onFocus={() => this.toggleSuggestions(query !== '')}
      >
        <InputContainer>
          <Icon type="search" />
          <SearchInput
            onChange={e => this.handleQueryChange(e.target.value)}
            onKeyDown={this.handleKeyDown}
            onClick={() => this.toggleSuggestions(true)}
            placeholder={t('collection.sidebar.searchAll')}
            value={query}
          />
        </InputContainer>
        {suggestionsVisible && (
          <SuggestionsContainer>
            <Suggestions>
              <SuggestionHeader>{t('collection.sidebar.searchIn')}</SuggestionHeader>
              <SuggestionItem
                onClick={e => this.handleSuggestionClick(e, -1)}
                onMouseDown={e => e.preventDefault()}
              >
                {t('collection.sidebar.allCollections')}
              </SuggestionItem>
              <SuggestionDivider />
              {collections.toIndexedSeq().map((collection, idx) => (
                <SuggestionItem
                  key={idx}
                  onClick={e => this.handleSuggestionClick(e, idx)}
                  onMouseDown={e => e.preventDefault()}
                >
                  {collection.get('label')}
                </SuggestionItem>
              ))}
            </Suggestions>
          </SuggestionsContainer>
        )}
      </SearchContainer>
    );
  }
}

export default translate()(CollectionSearch);
