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
  geselecteerdeGroente!: Groente;
  aantal: number = 0;

  constructor(private httpClient: HttpClient) {
    httpClient.get<Groente[]>('assets/groenten.json')
      .subscribe(groenten => {
        this.alleGroenten = groenten;
      });
  }

  mandjeAanmaken() {
    console.log(this.geselecteerdeGroente);
    this.groentenMandje.push(
      new Groente(this.geselecteerdeGroente.naam,
        this.geselecteerdeGroente.prijs,
        this.geselecteerdeGroente.eenheid)
    );
    console.log(this.groentenMandje);
  }
}
