import { Component, OnInit } from '@angular/core';
import { HoraireService } from '../services/horaire.service';
import { HorairePsy } from '../Models/HorairePsy';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rdvhoraire',
  templateUrl: './rdvhoraire.component.html',
  styleUrl: './rdvhoraire.component.css'
})
export class RdvhoraireComponent  implements OnInit {
  horaires!: HorairePsy[];
  clickedDate: string = ""; // Déclaration de la variable clickedDate
  idPsy: string = '';
  constructor(private route: ActivatedRoute, private horaireService: HoraireService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idPsy = params.get('id');
      this.clickedDate = params.get('date') || "";
      if (idPsy) {
        this.getHoraires(idPsy);
      }
    });
  }
  

  // getHoraires(idPsy: string): void {
  //   this.horaireService.getHorairesPsy(idPsy)
  //     .subscribe(horaires => this.horaires = horaires);
  // }
  getHoraires(idPsy: string): void {
    this.horaireService.getHorairesPsy(idPsy)
      .subscribe(horaires => {
        this.horaires = horaires.filter(horaire => horaire.dispo);
      });
  } 
}