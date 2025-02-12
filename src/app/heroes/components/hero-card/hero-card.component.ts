import { Component, Input, OnInit } from "@angular/core";
import { Hero } from "../../interfaces/heroes.interface";

@Component({
  selector: "hero-card",
  standalone: false,
  templateUrl: "./hero-card.component.html",
  styleUrl: "./hero-card.component.css",
})
export class HeroCardComponent implements OnInit {
  @Input()
  public hero!: Hero;

  ngOnInit(): void {
    if (!this.hero) {
      throw new Error("Method not implemented.");
    }
  }
}
