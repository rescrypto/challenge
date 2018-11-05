import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'brackets'
})
export class BracketsPipe implements PipeTransform {

  transform(value: any, args?: { start: string, end: string }): any {
    if (args) {
      return `${args.start}${value}${args.end}`;
    }
    return value;
  }

}
