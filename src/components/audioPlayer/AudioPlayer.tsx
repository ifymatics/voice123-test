import React from "react";

const AudioPlayer: React.FC<{ file: string }> = ({ file }) => {
  return (
    <audio controls>
      <source src={file} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;
