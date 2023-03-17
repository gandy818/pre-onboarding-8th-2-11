import React, { useEffect, useRef, useState } from "react";

const Index = () => {
  const [list, setList] = useState({
    todo: [
      {
        id: 0,
        title: "제목0",
        state: "todo",
        assignees: "나영",
        content: "todo0",
      },
    ],
    inprogress: [
      {
        id: 1,
        title: "제목1",
        state: "inprogress",
        assignees: "나영",
        content: "todo1",
      },
    ],
    completed: [
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
    ],
  });
  // const todoArr = list.filter((item) => item.state === "todo");
  // const inprogressArr = list.filter((item) => item.state === "inprogress");
  // const completedArr = list.filter((item) => item.state === "completed");
  const [state, setState] = useState("");
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragKey = useRef();
  const initial = useRef();

  //드래그 시작
  const dragStart = (e, position, state) => {
    dragItem.current = position;
    initial.current = state;
    console.log("처음 집은애 : " + initial.current);
  };

  //드래그중
  const dragEnter = (e, position, state) => {
    dragOverItem.current = position;

    dragItem.current = position;
    dragKey.current = state;
  };

  //드래그 끝, 드롭
  const drop = () => {
    const copyListItems = structuredClone(list); //list의 복사본
    const dragItemContent = copyListItems[initial.current][dragItem.current];
    console.log(copyListItems);
    console.log(dragItemContent);
    copyListItems[initial.current].splice(dragItem.current, 1);
    copyListItems[dragKey.current].splice(dragItem.current, 0, {
      id: dragItemContent.id,
      title: dragItemContent.title,
      state: dragKey.current,
      assignees: dragItemContent.assignees,
      content: dragItemContent.content,
    });
    dragItem.current = null;
    dragKey.current = null;
    setList(copyListItems);
  };
  useEffect(() => {}, [list]);
  return (
    <div>
      <div style={{ display: "flex", width: "100%" }}>
        {list &&
          Object.entries(list).map(([key, value]) => (
            <div key={key}>
              <div>| {key} |</div>
              {value &&
                value.length > 0 &&
                value.map((item, index) => (
                  <div
                    style={{
                      backgroundColor: "lightblue",
                      margin: "20px 10px",
                      textAlign: "center",
                      fontSize: "20px",
                    }}
                    key={index}
                    draggable
                    onDragStart={(e) => dragStart(e, index, item.state)}
                    onDragEnter={(e) => dragEnter(e, index, item.state)}
                    onDragEnd={drop}
                  >
                    <div>{item.id}</div>
                    <div>제목 : {item.title}</div>
                    <div>상태 : {item.state}</div>
                    <div>내용 : {item.content}</div>
                  </div>
                ))}
              {/* <div
                onDragStart={(e) => dragStart(e, key, value.length)}
                onDragEnter={(e) => dragEnter(e, key, value.length)}
                onDragEnd={drop}
              >
                drag here
              </div> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Index;
