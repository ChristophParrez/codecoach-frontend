import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from "../model/UserRole";

@Pipe({
  name: 'userRoles'
})
export class UserRolesPipe implements PipeTransform {

  transform(roles: UserRole[], joinString?:any): string {
    if (!roles) return '-';
    if (!joinString) joinString = ', ';
    return roles.map(role => role.role.charAt(0).toUpperCase() + role.role.substr(1).toLowerCase()).join(joinString);
  }

}
