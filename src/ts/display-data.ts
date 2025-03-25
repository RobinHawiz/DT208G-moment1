import { ICourseInfo } from "@ts/ICourseInfo";

// This function cannot be generic because it relies on properties specific to the ICourseInfo interface.
export function displayDataList(data: Array<ICourseInfo>): void {
  // Remove the previous tbody elem if it exists.
  let prevTbody: HTMLTableSectionElement | null =
    document.querySelector("tbody");
  if (prevTbody) prevTbody.remove();

  let table: HTMLTableElement = document.querySelector("table")!;
  let tbody: HTMLTableSectionElement = document.createElement("tbody");

  data.forEach(({ code, coursename, progression, syllabus }) => {
    const tr: HTMLTableRowElement = document.createElement("tr");
    // Create an array excluding syllabus (we handle it separately)
    [code, coursename, progression].forEach((text: string, index: number) => {
      const td: HTMLTableCellElement = document.createElement("td");
      if (index === 0) {
        const a: HTMLAnchorElement = document.createElement("a");
        a.innerText = text;
        a.href = syllabus;
        a.target = "_blank";
        td.appendChild(a);
      } else {
        td.innerText = text;
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
}
