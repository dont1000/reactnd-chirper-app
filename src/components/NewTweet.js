
import React,{Component} from "react";
import { connect } from "react-redux"
import { handleAddTweet } from "../actions/tweets"
import { Redirect } from 'react-router-dom'

class NewTweet extends Component {
  state = { text: "" };

  handleChangeText = (e) => {
    const text = e.target.value;
    this.setState(() => ({
      text,
      toHome:false
    }));
  };

  handleOnSubmit = (e) => {
      e.preventDefault()
      const {text} = this.state
      const {dispatch, id} = this.props
      dispatch(handleAddTweet(text, id));
    
       this.setState(() => ({
         text:'',
         toHome: id ? false : true
       }));
  };

  render() {
    const { text, toHome } = this.state;
    if(toHome===true){return <Redirect to="/" />;}
    const tweetLeft = 280 - text.length

    return (
      <div>
        <h3 className="center"> Compose new Tweet! </h3>
        <form className="new-tweet" onSubmit={this.handleOnSubmit}>
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChangeText}
            className="textarea"
            maxLength={280}
          />
          {tweetLeft < 100 && <div>{tweetLeft}</div>}

          <button className="btn" type="submit" disabled={text===''}>Submit</button>
        </form>
      </div>
    );
  }
}

export default connect()(NewTweet);