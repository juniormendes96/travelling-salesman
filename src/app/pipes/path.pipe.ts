import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'path'
})
export class PathPipe implements PipeTransform {
  transform([...cities]: string[]): any {
    cities.push(cities[0]);
    return cities.join(' -> ');
  }
}
