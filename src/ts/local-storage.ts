export function updateLocalStorage<T>(key: string, value: Array<T>): void {
  try {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error accessing localStorage: ", error);
  }
}

export function getLocalStorageData<T>(key: string): Array<T> {
  try {
    const data: string | null = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error: any) {
    console.error("Error accessing localStorage: ", error);
    return [];
  }
}
