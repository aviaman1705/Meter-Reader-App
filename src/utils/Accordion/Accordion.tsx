import { useState } from "react";
import AccordionItem from "./AccordionItem";

import classes from "./Accordion.module.css";

export default function Accordion() {
  const [accordionItemOpen, setAccordionItemOpen] = useState(1);
  const data = [
    {
      number: "01",
      title: "How long do I have to return my chair?",
      text: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum ea, tempora labore ut aut vel in
                    distinctio ducimus accusantium incidunt aliquam, nesciunt dolore veniam qui iusto quia!`,
      index: 0,
      array: [
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
        "Earum ea, tempora labore ut aut vel in",
        "distinctio ducimus accusantium incidunt aliquam,",
        "nesciunt dolore veniam qui iusto quia fuga dictablanditiis!",
      ],
    },
    {
      number: "02",
      title: "How long do I have to return my chair?",
      text: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum ea, tempora labore ut aut vel in
                    distinctio ducimus accusantium incidunt aliquam, nesciunt dolore veniam qui iusto quia!`,
      index: 1,
      array: [
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
        "Earum ea, tempora labore ut aut vel in",
        "distinctio ducimus accusantium incidunt aliquam,",
        "nesciunt dolore veniam qui iusto quia fuga dictablanditiis!",
      ],
    },
    {
      number: "03",
      title: "How long do I have to return my chair?",
      text: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum ea, tempora labore ut aut vel in
                    distinctio ducimus accusantium incidunt aliquam, nesciunt dolore veniam qui iusto quia!`,
      index: 2,
      array: [
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
        "Earum ea, tempora labore ut aut vel in",
        "distinctio ducimus accusantium incidunt aliquam,",
        "nesciunt dolore veniam qui iusto quia fuga dictablanditiis!",
      ],
    },
  ];

  return (
    <div className={classes["accordion"]}>
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          model={item}
          className={`${classes["item"]} ${
            accordionItemOpen === index ? classes["open"] : undefined
          }`}
          onClick={(index) => setAccordionItemOpen(index)}
        />
      ))}
    </div>
  );
}
