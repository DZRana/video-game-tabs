import React from "react";

const TabTable = ({ filteredTabs, handleClick }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Game / Anime</th>
          <th scope="col">Song</th>
          <th scope="col">Rating</th>
        </tr>
      </thead>
      <tbody>
        {filteredTabs.map((tab, i) => (
          <tr key={i}>
            <td>{tab.game}</td>
            <td>
              <button
                className="btn btn-link"
                id={tab._id}
                onClick={handleClick}
              >
                {tab.song}
              </button>
            </td>
            <td>{tab.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabTable;
