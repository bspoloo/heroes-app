import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/heroes.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  standalone: false,
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

  public searchInput : FormControl = new FormControl('');
  public heroes : Hero[] = [];
  public selecteHero? : Hero;

  constructor(private heroesService : HeroesService){}

  public searchHero() {
    const value : string = this.searchInput.value || '';

    this.heroesService.getSuggestions(value)
                            .subscribe(heroes => {
                              this.heroes = heroes
                            });

  }
  public onSelectedOption(event : MatAutocompleteSelectedEvent) : void{
    console.log(event.option.value);
    if(!event.option.value){
      this.selecteHero = undefined;
    }
    const hero : Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selecteHero = hero;
  }
}
