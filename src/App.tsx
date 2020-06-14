import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { reveal as Menu } from "react-burger-menu";
import TabTable from "./components/TabTable";

interface tab {
  _id: string;
  game: string;
  game_url: string;
  song: string;
  tab_url: string;
  rating: string;
  sheet: string;
}

class App extends Component<
  {},
  { tabs: Array<tab>; tabId: string; filterStr: string; loading: Boolean }
> {
  constructor(props: object) {
    super(props);
    this.state = {
      tabs: [],
      tabId: "",
      filterStr: "",
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const res = await fetch("http://localhost:3000/tabs");
      const api = await res.json();
      this.setState({ tabs: api, tabId: api[0]._id });
    } catch (err) {
      console.log(err);
    }
    this.setState({ loading: false });
  }

  handleClick = (event: any) => {
    this.setState({ tabId: event.target.getAttribute("id") });
  };

  onFilterChange = (event: any) => {
    this.setState({ filterStr: event.target.value });
  };

  render() {
    const { tabs, tabId, filterStr, loading } = this.state;
    const filteredTabs = tabs.filter((tab) =>
      tab.game.toLowerCase().includes(filterStr.toLowerCase())
    );
    const props = { filteredTabs: filteredTabs, handleClick: this.handleClick };
    return (
      <div className="App">
        {loading && <h2>Loading</h2>}
        {!loading && (
          <div id="outer-container">
            <Menu
              width={"40%"}
              pageWrapId={"page-wrap"}
              outerContainerId={"outer-container"}
            >
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Game / Anime"
                aria-label="Game / Anime"
                onChange={this.onFilterChange}
              />
              <TabTable {...props} />
            </Menu>
            <main id="page-wrap">
              <pre>
                {tabs.length > 0 &&
                  tabs.filter((tab) => tab._id === tabId)[0].sheet}
              </pre>
            </main>
          </div>
        )}
      </div>
    );
  }
}

export default App;

/* TODO:
  1. take a look at the filter for printing the sheet.
    - looks like it's running through all tabs
    - try to run through filtered tabs only

*/
