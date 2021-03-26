import React from "react";
import "./Content.scss";
import SearchBox from "../Searchbox/searchBox.js";
import Card from "../Cards/card.js";
import { connect } from "react-redux";
import {saveFilterData} from '../../Redux/Action/saveFilterData'
class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      filteredData: [],
      searchField: "",
      mostLike: false,
      mostComment: false,
    };
  }
  componentDidMount = () => {
    this.fetchingData();
  };
  fetchingData = async () => {
    let url =
      "https://raw.githubusercontent.com/Lokenath/MyRepo/master/Test/package.json";
    await fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        // this.setState({data:data.pics,filteredData:data.pics})
        this.setState(
          {
            data: data.pics,
          },
          () => {
            let filteredData = data.pics.filter((value) => {
              value.likeStatus = false;
              return value.category
                .toLowerCase()
                .includes(this.state.searchField.toLowerCase());
            });
            this.setState({ filteredData: filteredData });
            this.props.saveFilterData(filteredData);
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value }, () => {
      this.filterData();
    });
  };
  filterData = () => {
    let { data, filteredData, mostLike, mostComment } = this.state;
    filteredData = data.filter((value) => {
      return value.category
        .toLowerCase()
        .includes(this.state.searchField.toLowerCase());
    });
    if (mostLike) {
      filteredData = filteredData.sort((a, b) => {
        if (a.likes < b.likes) return 1;
        else return -1;
      });
    } else if (mostComment) {
      filteredData = filteredData.sort((a, b) => {
        if (a.comments.length < b.comments.length) return 1;
        else return -1;
      });
    }

    this.setState({ filteredData: filteredData });
  };
  toggleMostLike = () => {
    let { mostLike, mostComment } = this.state;
    if (mostComment) {
      mostComment = !mostComment;
    }
    mostLike = !mostLike;
    console.log(mostLike, mostComment);
    this.setState({ mostLike: mostLike, mostComment: mostComment }, () => {
      this.filterData();
    });
  };
  toggleMostComment = () => {
    let { mostLike, mostComment } = this.state;
    if (this.state.mostLike) {
      mostLike = !mostLike;
    }
    mostComment = !mostComment;
    this.setState({ mostLike: mostLike, mostComment: mostComment }, () => {
      this.filterData();
    });
  };
  toggleLike = (id) => {
    const data = this.state.data;
    data.map((value, key) => {
      if (value.id === id) {
        let NoOfLikes = value.likes;
        let likeStatus = value.likeStatus;

        if (!likeStatus) {
          NoOfLikes += 1;
        } else {
          NoOfLikes -= 1;
        }

        data[key].likes = NoOfLikes;
        data[key].likeStatus = !likeStatus;
      }
      return null;
    });
    this.setState({ data: data }, () => {
      this.filterData();
    });
  };
  addComment = (post, id) => {
    const data = this.state.data;
    data.map((value, key) => {
      if (value.id === id) {
        data[key].comments.push(post);
      }
      return null;
    });
    this.setState({ data: data }, () => {
      this.filterData();
    });
  };
  render() {
    const { filteredData ,mostLike,mostComment} = this.state;

    return (
      <div className="parent">
        <div className="header">Imaginary</div>
        <div className="menubar">
          <span onClick={() => this.toggleMostLike()} className={mostLike?"selectedClass":"clickClass"}>
            Most Liked
          </span>
          <span onClick={() => this.toggleMostComment()} className={mostComment?"selectedClass":"clickClass"}>
            Most Commented
          </span>
          <SearchBox onSearchChange={this.onSearchChange} />
        </div>
        <div className="cardContainer">
          {filteredData.map((value, key) => {
            return (
              <Card
                key={key}
                id={value?.id}
                url={value?.url}
                likes={value?.likes}
                category={value?.category}
                comments={value?.comments}
                addComment={this.addComment}
                toggleLike={this.toggleLike}
                likeStatus={value?.likeStatus}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("state:",state)
  return {};
  
};
const mapDispatchToProps = {
  saveFilterData: saveFilterData,
};
export default connect(mapStateToProps,mapDispatchToProps)(Content);
