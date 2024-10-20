import { accordionItemDTO } from "./accordion.models";

import classes from "./Accordion.module.css";

export default function AccordionItem(props: accordionItemProps) {
  return (
    <div className={props.className}>
      <p className={classes["number"]}>{props.model.number}</p>
      <p className={classes["text"]}>{props.model.title}</p>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className={classes["icon"]}
        onClick={() => props.onClick(props.model.index)}
      >
        <path
          fillRule="evenodd"
          d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
          clipRule="evenodd"
        />
      </svg>

      <div className={classes["hidden-box"]}>
        <p>{props.model.text}</p>
        <ul>
          <li>{props.model.array[0]}</li>
          <li>{props.model.array[1]}</li>
          <li>{props.model.array[2]}</li>
          <li>{props.model.array[3]}</li>
        </ul>
      </div>
    </div>
  );
}

interface accordionItemProps {
  model: accordionItemDTO;
  className: string;
  onClick(index: number): void;
}
