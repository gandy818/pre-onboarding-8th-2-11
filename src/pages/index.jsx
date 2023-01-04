import React, { useRef, useState } from "react";

const Index = () => {
  const [list, setList] = useState([
    {
      id: 0,
      title: "제목0",
      state: "todo",
      assignees: "나영",
      content: "todo0",
    },
    {
      id: 1,
      title: "제목1",
      state: "inprogress",
      assignees: "나영",
      content: "todo1",
    },
    {
      id: 2,
      title: "제목2",
      state: "completed",
      assignees: "나영",
      content: "todo2",
    },
    {
      id: 3,
      title: "제목3",
      state: "completed",
      assignees: "나영",
      content: "todo3",
    },
    {
      id: 4,
      title: "제목4",
      state: "completed",
      assignees: "나영",
      content: "todo4",
    },
  ]);
  const todoArr = list.filter((item) => item.state === "todo");
  const inprogressArr = list.filter((item) => item.state === "inprogress");
  const completedArr = list.filter((item) => item.state === "completed");

  const dragItem = useRef();
  const dragOverItem = useRef();

  //드래그 시작
  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  //드래그중
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  //드래그 끝, 드롭
  const drop = (e) => {
    let state = "";
    if (199 < e.clientX && 399 > e.clientX) {
      state = "inprogress";
    } else if (200 > e.clientX) {
      state = "todo";
    } else if (299 < e.clientX) {
      state = "completed";
    }

    const copyListItems = [...list];
    const dragItemContent = copyListItems[e.target.id];
    copyListItems.splice(e.target.id, 1);
    copyListItems.splice(e.target.id, 0, {
      id: dragItemContent.id,
      title: dragItemContent.title,
      state: state,
      assignees: dragItemContent.assignees,
      content: dragItemContent.content,
    });
    console.log(copyListItems);
    // dragItem.current = null;
    // dragOverItem.current = null;
    setList(copyListItems);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ border: "1px solid #000", width: "200px" }}>
          할일
          {todoArr &&
            todoArr.map((item, index) => (
              <div
                style={{
                  backgroundColor: "lightblue",
                  margin: "20px 10px",
                  textAlign: "center",
                  fontSize: "20px",
                }}
                onDragStart={(e) => dragStart(e, item.id)}
                onDragEnter={(e) => dragEnter(e, item.id)}
                onDragEnd={(e) => drop(e, item.id)}
                id={item.id}
                key={index}
                draggable
              >
                <div>{item.id}</div>
                <div>제목 : {item.title}</div>
                <div>상태 : {item.state}</div>
                <div>내용 : {item.content}</div>
              </div>
            ))}
        </div>
        <div style={{ border: "1px solid #000", width: "200px" }}>
          진행중
          {inprogressArr &&
            inprogressArr.map((item, index) => (
              <div
                style={{
                  backgroundColor: "lightblue",
                  margin: "20px 10px",
                  textAlign: "center",
                  fontSize: "20px",
                }}
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={drop}
                id={item.id}
                key={index}
                draggable
              >
                <div>{item.id}</div>
                <div>제목 : {item.title}</div>
                <div>상태 : {item.state}</div>
                <div>내용 : {item.content}</div>
              </div>
            ))}
        </div>
        <div style={{ border: "1px solid #000", width: "200px" }}>
          완료
          {completedArr &&
            completedArr.map((item, index) => (
              <div
                style={{
                  backgroundColor: "lightblue",
                  margin: "20px 10px",
                  textAlign: "center",
                  fontSize: "20px",
                }}
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={drop}
                id={item.id}
                key={index}
                draggable
              >
                <div>{item.id}</div>
                <div>제목 : {item.title}</div>
                <div>상태 : {item.state}</div>
                <div>내용 : {item.content}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
