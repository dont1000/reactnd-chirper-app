import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet, formatDate } from "../utils/helpers";
import { TiArrowBackOutline } from "react-icons/ti/index";
import { TiHeartOutline } from "react-icons/ti/index";
import { TiHeartFullOutline } from "react-icons/ti/index";
import { handleLikeTweet } from "../actions/tweets";
class Tweet extends Component {
  toParent = (e, id) => {
    e.preventDefault();
  };

  handleLike = (e) => {
    e.preventDefault();
    const { dispatch, authedUser, tweet } = this.props;
    dispatch(
      handleLikeTweet({
        id: tweet.id,
        hasLiked: tweet.hasLiked,
        authedUser,
      })
    );
  };

  render() {
    const { tweet } = this.props;

    console.log("props: ", this.props);
    if (tweet === null) {
      return <div> Tweet existiert nicht!</div>;
    }

    const { name, avatar, timestamp, text, hasLiked, likes, replies, parent } =
      tweet;

    return (
      <div className="tweet">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <div className="tweet-info">
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          {parent && (
            <button
              className="replying-to"
              onClick={(e) => this.propstoParent(e, parent.id)}
            >
              replying to @{parent.author}
            </button>
          )}
          <p>{text}</p>
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>

            <button className="heart-button" onClick={(e) => this.handleLike(e)}>
              {hasLiked === true ? (
                <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>

            <span>{likes !== 0 && likes} </span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, tweets }, { id }) {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;
  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null,
  };
}

export default connect(mapStateToProps)(Tweet);
