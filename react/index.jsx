import React from "react";
import ReactDOM from "react-dom";
const ProfileFunction = (props) => {
    const showMessage = () => {
      alert('用户是' + props.user);
    };
    const handleClick = () => {
      setTimeout(showMessage, 3 * 1000);
    };
    return (
      <button onClick={handleClick}>查询</button>
    );
  }

  class  ProfileClass extends React.Component {
    showMessage = () => {
      alert('用户是' + this.props.user);
    };
    handleClick = () => {
      setTimeout(this.showMessage, 3 * 1000);
    };
    render() {
      return <button onClick={this.handleClick}>查询</button>;
    }
  }


class App extends React.Component {
  state = {
    user: '小明',
  };
  render() {
    return (
      <>
        <label>
          <b> : </b>
          <select
            value={this.state.user}
            onChange={e => this.setState({ user: e.target.value })}
          >
            <option value="小明">Dan</option>
            <option value="小白">Sophie</option>
            <option value="小黄">Sunil</option>
          </select>
        </label>
        <h1>{this.state.user}</h1>
        <p>
          <ProfileFunction user={this.state.user} />
          <b> (function)</b>
        </p>
        <p>
          <ProfileClass user={this.state.user} />
          <b> (class)</b>
        </p>
      </>
    )
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
