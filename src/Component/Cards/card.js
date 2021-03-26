import React from "react";
import "./card.scss";

class Card extends React.Component {
  constructor() {
    super();

    this.state = {
      post: "",

      modalVisibility: false,
    };
  }
  changePost = (event) => {
    this.setState({ post: event.target.value });
  };

  toggleVisibility = (e) => {
    let { modalVisibility } = this.state;

    this.setState({ modalVisibility: !modalVisibility });
  };

  render() {
    const {
      url,
      likes,
      comments,
      category,
      addComment,
      id,
      toggleLike,
      likeStatus,
    } = this.props;
    const { post, modalVisibility } = this.state;
    return (
      <div className="cardParent ">
        {modalVisibility ? (
          <div className="zoomImageClass">
            <img alt="" src={url} className="zoomImageClass" />
            <div onClick={this.toggleVisibility} className="closeClass">
              X
            </div>
          </div>
        ) : (
          ""
        )}
        <img
          alt=""
          src={url}
          height="150px"
          width="150px"
          className="imageClass"
          onClick={(e) => this.toggleVisibility(e)}
        />
        <div className="likeParent">
          <div>
            {likes}
            <span
              className="likeStatus"
              onClick={() => toggleLike(this.props.id)}
            >
              {likeStatus ? " Dislike" : " Like"}
            </span>
          </div>
          <div>Category: {category}</div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Type your Comment Here.."
            onChange={this.changePost}
          />
          <button onClick={() => addComment(post, id)}>POST</button>
        </div>
        <div className="commentParent">
          {comments.map((value, key) => {
            return <div key={key}>{value}</div>;
          })}
        </div>
      </div>
    );
  }
}

export default Card;
