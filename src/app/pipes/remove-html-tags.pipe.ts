import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHtmlTags',
  standalone: true,
  pure: true,
})
export class RemoveHtmlTagsPipe implements PipeTransform {
  transform(value: string): string {
    return value?.replace(/<[^>]*>/g, '') ?? '';
  }
}
