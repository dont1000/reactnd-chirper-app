
import React,{Component} from "react";

class NewTweet extends Component {
  state = { text: "" };

  handleChangeText = (e) => {
    const text = e.target.value;
    this.setState(() => ({
      text,
    }));
  };

  handleOnSubmit = (e) => {
      e.preventDefault()
      console.log(this.state.text)
       this.setState(() => ({
         text:''
       }));
  };

  render() {
      const {text} = this.state;
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

export default NewTweet;