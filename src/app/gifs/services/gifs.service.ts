import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from "environment";
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) {
    this.loadLocalStorage()
  }

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = []

  get tagsHistory() {
    return [...this._tagsHistory]
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase()
    const indexFound = this._tagsHistory.findIndex(i => i === tag)
    if(indexFound >= 0)
      this._tagsHistory.splice(indexFound, 1)
    this._tagsHistory.unshift(tag)
    this._tagsHistory = this._tagsHistory.splice(0,10)
    
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage(): void {
    if(!localStorage.getItem('history')) return

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!)

    if(this._tagsHistory.length === 0) return
    this.searchTag(this._tagsHistory[0])
  }

  searchTag(tag: string):void {
    if(tag.length === 0) return
    this.organizeHistory(tag)

    const params = new HttpParams()
      .set('api_key', environment.GIPHY_API_KEY)
      .set('limit', 12)
      .set('q', tag)

    this.http.get<SearchResponse>(`${environment.GIPHY_URL}/search`, { params })
      .subscribe(res => {
        this.gifList = res.data
      })
  }

}
