import { saveLikeToggle } from "../utils/api";

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_TWEET = "LIKE_TWEET"
const ADD_TWEET = "LIKE_TWEET"
export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  };
}

//text, author, replyingTo
export function addTweet({info}) {
  return{
    type: ADD_TWEET,
    info
  }
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