// Styles
import "@styles/style.scss";
// Interfaces
import { ICourseInfo } from "@ts/ICourseInfo";
// Classes
import { DataList } from "@ts/DataList";
// Functions
import { fetchData } from "@ts/fetch-data";
import { displayDataList } from "@ts/display-data";
import { getLocalStorageData, updateLocalStorage } from "@ts/local-storage";

async function main(): Promise<void> {
  let data: DataList<ICourseInfo>;
  let localStorageData: DataList<ICourseInfo> = new DataList(
    getLocalStorageData<ICourseInfo>("Courses")
  );
  // Use local storage data if available, otherwise fetch new data.
  if (localStorageData.getDataList().length !== 0) data = localStorageData;
  else {
    data = new DataList<ICourseInfo>(
      await fetchData<Array<ICourseInfo>>(
        "https://webbutveckling.miun.se/files/ramschema_ht24.json"
      )
    );
    updateLocalStorage<ICourseInfo>("Courses", data.getDataList());
  }

  displayDataList(data.getDataList());
}

main();
