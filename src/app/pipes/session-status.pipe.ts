import {Pipe, PipeTransform} from '@angular/core';
import {Status} from "../model/Status";
import {Role} from "../model/Role";

@Pipe({
  name: 'sessionStatus'
})
export class SessionStatusPipe implements PipeTransform {

  transform(value: Status, pageRole?: Role): any {

    if (value === Status.FINISHED_CANCELLED_BY_COACH && pageRole === Role.COACH) {
      return "Cancelled by you"
    }

    if (value === Status.FINISHED_CANCELLED_BY_COACH && pageRole === Role.COACHEE) {
      return "Cancelled (by Coach)"
    }

    if (value === Status.FINISHED_CANCELLED_BY_COACH && pageRole === Role.ADMIN) {
      return "Cancelled (by Coach)"
    }

    if (value === Status.FINISHED_CANCELLED_BY_COACHEE && pageRole === Role.COACHEE) {
      return "Cancelled (by you)"
    }

    if (value === Status.FINISHED_CANCELLED_BY_COACHEE && pageRole === Role.COACH) {
      return "Cancelled (by Coachee)"
    }

    if (value === Status.FINISHED_CANCELLED_BY_COACHEE && pageRole === Role.ADMIN) {
      return "Cancelled (by Coachee)"
    }

    if (value === Status.ACCEPTED) {
      return "Accepted"
    }

    if (value === Status.DECLINED) {
      return "Declined"
    }

    if (value === Status.REQUESTED) {
      return "Requested"
    }

    if (value === Status.FINISHED_AUTOMATICALLY_CLOSED) {
      return "Automatically closed"
    }

    if (value === Status.DONE_WAITING_FOR_FEEDBACK) {
      return "Done"
    }

    if (value === Status.FINISHED_FEEDBACK_GIVEN) {
      return "Done"
    }
  }
}
