import { useState, useEffect } from "react";

import classes from "./Pagination.module.css";

export default function Pagination(props: paginationProps) {
  const [linkModels, setLinkModels] = useState<linkModel[]>([]);

  function selectPage(event: any, link: linkModel) {
    event.preventDefault();
    const selectedPage = checkString(link.text)
      ? parseInt(link.text)
      : link.page;

    if (selectedPage === props.currentPage) {
      return;
    }

    if (!link.enabled) {
      return;
    }

    props.onChange(selectedPage);
  }

  function checkString(string: string) {
    return /^[0-9]*$/.test(string);
  }

  useEffect(() => {
    // בדיקה האם ניתן ללחוץ על כפתור הקודם
    const previousPageEnabled = props.currentPage !== 1;

    //אתחול משתנה previousPage לדף הנוכחי פחות 1
    const previousPage = props.currentPage - 1;
    const links: linkModel[] = [];

    links.push({
      text: "הקודם",
      enabled: previousPageEnabled,
      page: previousPage,
      active: false,
      class: "prev-btn",
    });

    for (let i = 1; i <= props.totalAmontOfPages; i++) {
      if (
        i >= props.currentPage - props.radio &&
        i <= props.currentPage + props.radio
      ) {
        links.push({
          text: `${i}`,
          active: props.currentPage === i,
          enabled: true,
          page: i,
          class: "",
        });
      }
    }

    const nextPageEnabled =
      props.currentPage !== props.totalAmontOfPages &&
      props.totalAmontOfPages > 0;
    const nextPage = props.currentPage + 1;

    links.push({
      text: "הבא",
      enabled: nextPageEnabled,
      page: nextPage,
      active: false,
      class: "next-btn",
    });

    setLinkModels(links);
  }, [props.currentPage, props.totalAmontOfPages, props.radio]);

  return (
    <>
      {linkModels.map((link) => {
        if (link.text === "הקודם") {
          return (
            <button
              className={classes["btn"]}
              disabled={props.currentPage === 1}
              key={link.text}
              onClick={(e: any) => selectPage(e, link)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className={classes["btn-icon"]}
              >
                <path
                  fillRule="evenodd"
                  d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          );
        }
        if (link.text === "הבא") {
          return (
            <button
              className={classes["btn"]}
              disabled={props.currentPage === props.totalAmontOfPages}
              key={link.text}
              onClick={(e: any) => selectPage(e, link)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className={classes["btn-icon"]}
              >
                <path
                  fillRule="evenodd"
                  d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          );
        } else {
          return (
            <a
              className={`${classes["page-link"]} ${
                link.text === props.currentPage.toString()
                  ? classes["page-link--current"]
                  : undefined
              }`}
              href="/#"
              key={link.text}
              onClick={(e: any) => selectPage(e, link)}
            >
              {link.text}
            </a>
          );
        }
      })}
    </>
  );
}

interface linkModel {
  page: number;
  enabled: boolean;
  text: string;
  active: boolean;
  class: string;
}

interface paginationProps {
  currentPage: number;
  totalAmontOfPages: number;
  radio: number;
  onChange(page: number): void;
}

Pagination.defaultProps = {
  radio: 2,
};
