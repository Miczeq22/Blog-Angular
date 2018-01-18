import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textShorter'
})
export class TextShorterPipe implements PipeTransform {

  transform(value: string, length: number): any {
    if (value.length <= length) {
      return value;
    } else {
      return value.slice(0, length) + '...';
    }
  }

}
