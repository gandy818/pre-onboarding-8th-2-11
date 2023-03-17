import React from "react";

const main = () => {
  const list = [
    { id: 0, title: "제목1", state: "todo" },
    { id: 1, title: "제목2", state: "todo" },
    { id: 2, title: "제목3", state: "todo" },
  ];
  return (
    <div>
      <div>DND Project</div>
      {list.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

export default main;
