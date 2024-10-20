import { tableHeaderDTO } from "./table.model";

export default function TableHeader(props: tableHeaderProps) {
  return (
    <>
      <thead className="thead-dark">
        <tr>
          {props.columns?.map(function (item, index) {
            return (
              <th
                key={index}
                className="sortable"
                data-key={item.dataKey}
                style={{
                  cursor: item.cursor,
                  backgroundImage: item.backgroundImage,
                  backgroundRepeat: item.backgroundRepeat,
                  backgroundPosition: item.backgroundPosition,
                }}
                onClick={(event: any) => {
                  const td = event.target;
                  const dataKey = td.attributes["data-key"].value;
                  props.onSorting(dataKey);
                }}
              >
                {item.title}
              </th>
            );
          })}
          <th>עריכה</th>
          <th>מחיקה</th>
        </tr>
      </thead>
    </>
  );
}

interface tableHeaderProps {
  columns: tableHeaderDTO[];
  onSorting(sortColumn: string): void;
}
