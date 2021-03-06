import React, { Component } from 'react'

class Topbar extends Component {
  state = {}

  getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
    return (
      <span className="name">
        {' '}
        {parts.map((part, i) => (
          <span
            key={i}
            className={
              part.toLowerCase() === highlight.toLowerCase() ? 'bl-txt' : {}
            }
          >
            {part}
          </span>
        ))}{' '}
      </span>
    )
  }

  render() {
    const {
      searchInput,
      onSearchInputChange,
      results,
      finalSearch,
      onResultClick,
      data,
      showDefaultResults,
      defaultResults,
      changeDefaultResultsShowcase,
      onBlurInput,
    } = this.props

    return (
      <div className="topbar">
        <div className="container">
          <div className="search-cont">
            <div className="main">
              <input
                placeholder="Search for a District..."
                type="text"
                className="search-input"
                value={searchInput}
                onChange={onSearchInputChange}
                onFocus={() => {
                  changeDefaultResultsShowcase(true)
                }}
                onBlur={onBlurInput}
              />
              <span className="search-icon-cont">
                <img
                  src="https://img.icons8.com/android/15/000000/search.png"
                  alt="search-icon"
                  className="search-icon"
                />
              </span>
            </div>
            {!searchInput.length && showDefaultResults ? (
              <div className="results">
                {data
                  .filter((item, idx) => defaultResults[item.district])
                  .map((dist, idx) => (
                    <div
                      key={idx}
                      className="result"
                      onClick={() => {
                        onResultClick(dist.district)
                      }}
                    >
                      {this.getHighlightedText(dist.district, searchInput)}
                      <span
                        className="zone"
                        style={{ background: `${dist.zone}` }}
                      >
                        {dist.zone}
                      </span>
                    </div>
                  ))}
              </div>
            ) : null}
            {finalSearch ? null : results.length ? (
              <div className="results">
                {results.map((item, idx) => (
                  <div
                    key={idx}
                    className="result"
                    onClick={() => onResultClick(item.district)}
                  >
                    {this.getHighlightedText(item.district, searchInput)}
                    <span
                      className="zone"
                      style={{ background: `${item.zone}` }}
                    >
                      {item.zone}
                    </span>
                  </div>
                ))}
              </div>
            ) : searchInput.length ? (
              <div className="results">
                <img
                  style={{ objectFit: 'cover', width: '100%' }}
                  alt="no-result"
                  src={require('../../assets/empty.png')}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Topbar
