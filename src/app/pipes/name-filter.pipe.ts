import { Pipe, PipeTransform } from '@angular/core';
import {User} from "../model/User";

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(coaches: User[], searchText: string): any[] {
    searchText = searchText.toLocaleLowerCase();

    return coaches.filter(coach => coach.firstName.toLocaleLowerCase().includes(searchText)
      || coach.lastName.toLocaleLowerCase().includes(searchText)
      || coach.email.toLocaleLowerCase().includes(searchText));
  }

}
