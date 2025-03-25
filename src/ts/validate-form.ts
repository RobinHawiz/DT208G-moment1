import { ICourseInfo } from "@ts/ICourseInfo";
import { DataList } from "@ts/DataList";
import { getLocalStorageData } from "@ts/local-storage";

export function initFormValidation(submitCallback: (e: Event) => void) {
  const form: HTMLFormElement = document.querySelector("form")!;
  form.addEventListener("submit", validateForm);

  const courseCodeInput: HTMLInputElement = form.querySelector("#course-code")!;
  const progressionInput: HTMLInputElement =
    form.querySelector("#progression")!;

  // Reset validation state as the user types
  courseCodeInput.addEventListener("input", () => {
    validateField(courseCodeInput, "");
  });

  progressionInput.addEventListener("input", () => {
    validateField(progressionInput, "");
  });

  function validateForm(e: Event): void {
    e.preventDefault();
    let data: DataList<ICourseInfo> = new DataList(
      getLocalStorageData<ICourseInfo>("Courses")
    );
    let formIsValid: boolean = true; // Flag to track if the form is valid or not.
    // Check if the entered course code already exists in the data list.
    let courseCodeIsNotValid: ICourseInfo | undefined = data
      .getDataList()
      .find(({ code }) => code === courseCodeInput.value);
    // If the course code is not unique, show an error for course code.
    if (courseCodeIsNotValid) {
      validateField(
        courseCodeInput,
        "Kurskoden finns redan. Var vänlig och ange en unik kurskod."
      );
      formIsValid = false;
    }
    // If the course code is valid but progression is incorrect, show an error for progression.
    if (
      !courseCodeIsNotValid &&
      !["A", "B", "C"].includes(progressionInput.value)
    ) {
      validateField(
        progressionInput,
        "Felaktig progression. Var vänlig och ange en korrekt progression: A, B eller C."
      );
      formIsValid = false;
    }
    // If the form is valid, proceed to submit (callback function).
    if (formIsValid) submitCallback(e);
  }

  function validateField(input: HTMLInputElement, message: string): void {
    input.setCustomValidity(message); // Set the custom validity message for the field
    input.reportValidity(); // Display the validation message to the user
  }
}
