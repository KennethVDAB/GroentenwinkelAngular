import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Groente} from "../groente";
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  groentenMandje: Groente[] = [];
  alleGroenten: Groente[] = [];
  geselecteerdeGroente!: string;
  aantal: number = 0;

  constructor(private httpClient: HttpClient) {
    httpClient.get<Groente[]>('assets/groenten.json')
      .subscribe(groenten => {
        this.alleGroenten = groenten;
      });
  }

  mandjeAanmaken(): void {
    const naam = this.geselecteerdeGroente.split("(")[0].trim();
    let groente = this.alleGroenten.find((value) => {
      return value.naam == naam;
    });
    if (groente !== undefined) {
      if (this.groenteBestaatAl(groente)) {
        this.wijzigGroente(groente, this.aantal);
      } else {
        this.groentenMandje.push(
          new Groente(groente.naam,
            groente.prijs,
            groente.eenheid,
            this.aantal)
        );
      }
    }
  }

  rijVerwijderen(groente: Groente): void {
    const index = this.groentenMandje.indexOf(groente);
    this.groentenMandje.splice(index);
  }

  berekenTotaal(): number {
    let totaal = 0;
    for (const alleGroentenElement of this.groentenMandje) {
      totaal += (alleGroentenElement.prijs * alleGroentenElement.aantal);
    }
    return totaal;
  }

  private groenteBestaatAl(groente: Groente): boolean {
    for (const groentenMandjeElement of this.groentenMandje) {
      if (groente.naam === groentenMandjeElement.naam) {
        return true;
      }
    }
    return false;
  }

  private wijzigGroente(groente: Groente, aantal: number): void {
    let index = 0;
    const gevondenGroente = this.groentenMandje.find((value, i) => {
      index = i;
      return value.naam == groente.naam;
    });
    if (gevondenGroente !== undefined) {
      gevondenGroente.aantal += aantal;
      this.groentenMandje[index] = gevondenGroente;
    }
  }
}
