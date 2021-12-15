import { Pipe, PipeTransform } from '@angular/core';
import {User} from "../model/User";

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(users: User[], searchText: string): any[] {
    searchText = searchText.toLocaleLowerCase();

    return users.filter(user => user.firstName.toLocaleLowerCase().includes(searchText)
      || user.lastName.toLocaleLowerCase().includes(searchText)
      || user.email.toLocaleLowerCase().includes(searchText));
  }

}
