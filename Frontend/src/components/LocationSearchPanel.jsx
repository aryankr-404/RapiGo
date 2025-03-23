import React from "react";
import "remixicon/fonts/remixicon.css";

const LocationSearchPanel = ({ suggestions, onSuggestionSelect }) => {
  return (
    <div>
      {suggestions.slice(0, 4).map((suggestion, index) => (
    <div
        onClick={() => onSuggestionSelect(suggestion)}
        key={index}
        className="flex border-2 border-white  active:border-black rounded-xl p-3  items-center justify-start flex-row gap-2 "
        >
        <div className="bg-[#eeeeee] rounded-full p-2  flex items-center justify-center">
        <i className="ri-map-pin-fill"></i>
        </div>
        <h4 className="font-medium">{suggestion.description}</h4>
    </div>
    ))}
    </div>
  );
};

export default LocationSearchPanel;
