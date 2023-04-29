import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5 class="text-slate-50">Buscar:</h5>
    <input
      type="text"
      class="block w-full p-2 mt-2 rounded focus-visible:outline-none"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    >
  `,
  styles: [
  ]
})
export class SearchBoxComponent {

  constructor(private gifsService: GifsService) {}

  @ViewChild('txtTagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag)
    this.tagInput.nativeElement.value = ''
  }

}
