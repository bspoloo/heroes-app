import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/heroes.interface';

@Pipe({
  name: 'localImg',
  standalone: false
})
export class LocalImgPipe implements PipeTransform {

  transform( hero: Hero): string {
    if(!hero.id){
      return `assets/no-image.png`;
    }
    return `assets/heroes/${hero.id}.jpg`;
  }

}
