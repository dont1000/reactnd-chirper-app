import { saveLikeToggle, saveTweet } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_TWEET = "LIKE_TWEET"
const ADD_NEW_TWEET = "LIKE_TWEET"
export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  };
}

//text, author, replyingTo
export function addTweet(tweet) {
  return{
    type: ADD_TWEET,
    tweet
  }
}

export function handleAddTweet(text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch( showLoading );
    return saveTweet({ text, author: authedUser, replyingTo})
      .then((tweet) => {
        dispatch(addTweet(tweet));
      })
      .then(() => {
        dispatch(hideLoading);
      });
  };
}


export function toggleTweet({id, authedUser, hasLiked}) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked,
  };
}


export function handleLikeTweet(info) {
  return (dispatch) => {
     dispatch(toggleTweet(info));
   return saveLikeToggle(info)
    .catch((e)=>{
      console.warn("Error in handleToggleTweet", e)
      dispatch(toggleTweet(info));
      alert("there was an error, please like again")
    });
  }
}