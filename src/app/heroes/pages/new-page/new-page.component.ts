import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Hero, Publisher } from "../../interfaces/heroes.interface";
import { HeroesService } from "../../services/heroes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, switchMap, tap } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../../components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-new-page",
  standalone: false,
  templateUrl: "./new-page.component.html",
  styleUrl: "./new-page.component.css",
})
export class NewPageComponent implements OnInit {
  public heroForm: FormGroup = new FormGroup({
    id: new FormControl<string>(""),
    superhero: new FormControl<string>("", { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(""),
    first_appearance: new FormControl<string>(""),
    characters: new FormControl<string>(""),
    alt_img: new FormControl<string>(""),
  });
  public router: Router;

  constructor(
    private herosService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.router = new Router();
  }

  ngOnInit(): void {
    if (!this.router.url.includes("edit")) {
      return;
    }
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.herosService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) {
          return this.router.navigateByUrl("/");
        }
        this.heroForm.reset(hero);
        return;
      });
  }

  public pusblishers = [
    {
      id: "DC commics",
      value: "DC - Comics",
    },
    {
      id: "Marvel commics",
      value: "Maver - Comics",
    },
  ];

  public OnSubmit(): void {
    if (!this.heroForm.valid) {
      return;
    }
    if (this.getCurrentHero().id) {
      this.herosService.updateHero(this.getCurrentHero()).subscribe((hero) => {
        this.showSnackBar(`${hero.superhero} was updated succefully`);
      });
      return;
    }
    const newHero = this.getCurrentHero();
    newHero.id = `${newHero.publisher.split("-")[0]}-${
      newHero.superhero.toLowerCase().split(" ")[0]
    }`;
    this.herosService.createHero(newHero).subscribe((hero) => {
      this.showSnackBar(
        `${newHero.superhero} was created succefully with a id: ${newHero.id}`
      );
    });
  }
  public getCurrentHero(): Hero {
    const hero: Hero = this.heroForm.value as Hero;
    return hero;
  }
  public onDeleteHero(): void {
    if (!this.getCurrentHero().id) {
      throw new Error("Current hero not exist");
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
    .pipe(
      filter((result : boolean) => result),
      switchMap(() => this.herosService.deleteHero(this.getCurrentHero())),
      filter(wasDelted => wasDelted)
    ).subscribe(result => {
      console.log(result);
      this.router.navigateByUrl('/heroes');
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log("Dialogs was close", result);
    //   if (!result) {
    //     return;
    //   }
    //   this.herosService.deleteHero(this.getCurrentHero())
    //   .subscribe(result => {
    //     if(result){
    //       this.router.navigateByUrl('/heroes');
    //     }
    //   });
    // });
  }
  public showSnackBar(message: string): void {
    this.snackBar.open(message, "done", {
      duration: 2500,
    });
  }
}
