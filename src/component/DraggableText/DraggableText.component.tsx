
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { AbsoluteFill } from "remotion";
import { ITextElement } from "../../general/interface";
import { useCurrentFrame } from "remotion";
import "./DraggableText.css";

export default function DraggableText({
  text,
  setText,
  position,
  saveInformation,
  pause,
  setPosition,
  play,
}: ITextElement) {

  const [localPosition, setLocalPosition] = useState<any>({ x: 0, y: 0 });
  const [previousText, setPreviousText] = useState("");
const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (position) {
      setLocalPosition(position);
    }
  }, [position]);

  const handleStop = (e: any, data: any) => {
    const newPosition = {
      x: data.x,
      y: data.y,
    };
    setLocalPosition(newPosition);
    saveInformation(newPosition);
  };

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      saveInformation();
    }
    else if (e.key === "Backspace") {
            console.log('Backspace called')
            console.log(text)
            //@ts-ignore
            setPreviousText(text);
          }
  };

  const frame = useCurrentFrame();

  // useEffect(() => {
  //   if (!position) {
  //     localStorage.setItem("position", JSON.stringify(localPosition));
  //   }
  // }, [localPosition]);

  // useEffect(() => {
  //   const storedPosition = localStorage.getItem("position");
  //   if (storedPosition && !position) {
  //     setLocalPosition(JSON.parse(storedPosition));
  //   }
  // }, []);
  // Retrieve the text value from local storage on component mount
  useEffect(() => {
    const storedText = localStorage.getItem("text");

    if (storedText) {
      // Only set the state if the stored value is different from the initial state
      if (storedText !== text) {
        setText(storedText);
      }
    }

  }, []);
  useEffect(() => {
    const storedPosition = localStorage.getItem("textPosition");

    if (storedPosition) {
      console.log("entered log");
      const parsedPosition = JSON.parse(storedPosition);

      if (parsedPosition.x !== localPosition.x || parsedPosition.y !== localPosition.y) {
        console.log("entered log Wow");
        console.log("storedPosition", parsedPosition);
        setLocalPosition(parsedPosition);
        setPosition(parsedPosition)
      }
    }
  }, []);

  // Update the stored text value in local storage whenever it changes
  useEffect(() => {
    //@ts-ignore
    localStorage.setItem("text", text);
    localStorage.setItem("textPosition", JSON.stringify(localPosition));
  }, [text, localPosition]);

  
  const handleUndo = () => {
    console.log(previousText,'previousText')
    setText(previousText); // Set the text with the previous value
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <>
      <AbsoluteFill style={AbsoluteStyle}>
        <Draggable
          onStop={handleStop}
          bounds="parent"
          position={localPosition}
          onStart={() => pause()}
        >
          <div>
            <TextField
              id="inputText"
              helperText="Press enter to save changes"
              className="inputStyle"
              onChange={(e) => setText(e.target.value)}
              value={text}
              onKeyDown={handleEnter}
            />
          </div>
        </Draggable>
        <Box className="frameBox">Frame: {frame}</Box>
        <button onClick={handleUndo}>Undo {" "} / {" "}Redo</button>
      </AbsoluteFill>
   
    </>
  );
}

const AbsoluteStyle = {
  justifyContent: "center",
  alignItems: "center",
  fontSize: 30,
  backgroundColor: "white",
};