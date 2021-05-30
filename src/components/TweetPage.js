import React,{Component} from "react";
import {connect} from "react-redux";
import Tweet from "../components/Tweet"
import NewTweet from "../components/NewTweet"

class TweetPage extends Component{
      
    render(){
 
        return (
          <div>
            <Tweet id={this.props.id} />
            <NewTweet id={this.props.id} />
            {this.props.replies.map((id) => (
              <Tweet id={id} />
            ))}
          </div>
        );
    }
}
function mapStateToProps({authedUser, tweets, user}, props){

    const { id } = props.match.params
    return {
      id,
      replies: !tweets[id]
        ? []
        : tweets[id].replies.sort(
            (a, b) => tweets[b].timestamp - tweets[a].timestamp
          ),
    };
}

export default connect(mapStateToProps)(TweetPage);