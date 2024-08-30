
import { useState } from "react";

import './AccordianTab.css';

function AccordionItem({ week, topic, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="drop-down">
      <button
        className="drop-down-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">
          Week {week}: {topic}
        </span>
        <span className="text-red-400">{isOpen ? "▲" :   "▼"}</span>
      </button>
      {isOpen && <p className="p-2">{content}</p>}
    </div>
  );
}
export default AccordionItem;
