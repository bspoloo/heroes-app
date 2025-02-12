import { Component, OnInit } from "@angular/core";
import { Hero } from "../../interfaces/heroes.interface";
import { HeroesService } from "../../services/heroes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { subscribe } from "diagnostics_channel";
import { switchMap } from "rxjs";

@Component({
  selector: "app-hero-page",
  standalone: false,
  templateUrl: "./hero-page.component.html",
  styleUrl: "./hero-page.component.css",
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero;
  public router : Router = new Router();
  public id: string = "";
  constructor(private heroesService: HeroesService, private activatedRouted: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRouted.params
    .pipe(
      switchMap(({id}) => this.heroesService.getHeroById(id)),
    )
    .subscribe(hero => {
      if (!hero) {
        return this.router.navigate(['/heroes/list']);
      }
      this.hero = hero;
      return;
    });
  }
}
