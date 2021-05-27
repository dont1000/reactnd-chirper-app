import React, { Component } from 'react'
import {connect} from 'react-redux'
import Tweet from './Tweet'

class Dashboard extends Component{
    render(){
        return (
          <div>
            <h3 className="center">Your Timeline</h3>
            <ul className="dashboard-list">
              {this.props.tweetsId.map((tweetID) => (
                <li key={tweetID}>
                  <div><Tweet id={tweetID} /></div>
                </li>
              ))}
            </ul>
          </div>
        );
    }
}

function mapToStore({tweets}){
    return {
        tweetsId: Object.keys(tweets)
            .sort((a,b)=> tweets[a].timestamp-tweets[b].timedstamp)
    }
}

export default connect(mapToStore)(Dashboard);