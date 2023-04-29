import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
  styles: [
  ]
})
export class CardListComponent {
  @Input()
  public gifs: Gif[] = []

  get firstColumn(): Gif[] {
    return this.gifs.slice(0, 4)
  }

  get secondColumn(): Gif[] {
    return this.gifs.slice(4, 8)
  }

  get thirdColumn(): Gif[] {
    return this.gifs.slice(8, 12)
  }

}
