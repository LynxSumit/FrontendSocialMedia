import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";
const bpoint = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};
const MasonryLayout = ({ pins }) => {
  
  return (
    <Masonry className="my-3 mx-2 flex animate-slide-fwd" breakpoint={bpoint}>
      {pins?.map((pin) => (
        
        <Pin key={pin._id} pin={pin} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
