import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'excerpt'
})
export class ExcerptPipe implements PipeTransform {
    transform(text: string, limit: number): string {
        try {
            if (text.length > limit) {
                return text.substr(0, limit) + '...';
            } else {
                return text;
            }
        } catch (e) {
            return '';
        }
    }

}
