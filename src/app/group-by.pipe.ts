import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform(value: any, groupLength: number, index: number): any {
    if ( groupLength > 0  && index === 0) { // if first member of car group return make
       return value + ':';
    }
    return null;     // else return null so that make is not repeated
  }

}
