import { DataList } from "@ts/DataList";
import { ICourseInfo } from "@ts/ICourseInfo";
import { getLocalStorageData, updateLocalStorage } from "@ts/local-storage";
import { displayDataList } from "@ts/display-data";

export function processFormData(e: Event): void {
  // Typecasting because typescript is acting up.
  const form: HTMLFormElement = <HTMLFormElement>e.target;

  const courseCodeInput: HTMLInputElement = form.querySelector("#course-code")!;
  const courseNameInput: HTMLInputElement = form.querySelector("#course-name")!;
  const progressionInput: HTMLInputElement =
    form.querySelector("#progression")!;

  const code: string = courseCodeInput.value;
  const coursename: string = courseNameInput.value;
  const progression: string = progressionInput.value;
  const syllabus: string =
    "https://www.youtube.com/watch?v=WIRK_pGdIdA&list=PLpQpolEIRhPtKIte1nTmjYcJCriNwj20L&ab_channel=doober43";

  // Create a new course object using the form data.
  const course: ICourseInfo = { code, coursename, progression, syllabus };

  let data: DataList<ICourseInfo> = new DataList(
    getLocalStorageData<ICourseInfo>("Courses")
  );

  // Update the local storage with the new course data and display it.
  data.addItem(course);
  updateLocalStorage<ICourseInfo>("Courses", data.getDataList());
  displayDataList(data.getDataList());

  alert("Din kurs har lagts till längst ner i listan!");
}
