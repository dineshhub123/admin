import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replacePath'
})
export class ReplacePathPipe implements PipeTransform {

   transform(value: string, search: string, replace: string): string {
  if (!value || typeof value !== 'string') return value;
  return value.replace(search, replace);
}

}
