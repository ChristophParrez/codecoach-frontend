import { Pipe, PipeTransform } from '@angular/core';
import { Session } from "../model/Session";

@Pipe({
  name: 'sessionStatus'
})
export class SessionStatusPipe implements PipeTransform {

  transform(session: Session[], status: string): unknown {
    return session.filter(session => session.status.statusName.toUpperCase().includes(status.toUpperCase()));
  }

}
