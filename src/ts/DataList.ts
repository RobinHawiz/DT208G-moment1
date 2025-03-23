export class DataList<T> {
  constructor(private readonly list: Array<T> = []) {}

  getDataList(): Array<T> {
    // Returns a shallow copy of the list to prevent direct modification of the original array.
    // However it does not protect against modifications to objects within the array, but that's whatever.
    return [...this.list];
  }

  addItem(item: T): void {
    this.list.push(item);
  }
}
