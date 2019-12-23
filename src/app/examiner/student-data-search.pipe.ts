import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "studentDataSearch"
})
export class StudentDataSearchPipe implements PipeTransform {
  transform(studentsData: object[], searchField: string, searchItem: any): any {
    if (searchItem == undefined) {
      return studentsData;
    } else {
      return studentsData.filter(studentsDataObj =>
        studentsDataObj[searchField]
          .toString()
          .toLowerCase()
          .includes(searchItem.toLowerCase())
      );
    }
  }
}
