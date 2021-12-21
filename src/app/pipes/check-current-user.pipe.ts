import { Pipe, PipeTransform } from '@angular/core';
import {Session} from "../model/Session";
import {User} from "../model/User";

@Pipe({
  name: 'checkCurrentUser'
})
export class CheckCurrentUserPipe implements PipeTransform {

  transform( session: Session, user: User): unknown {
    return null;
  }

}
