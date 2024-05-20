import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.css']
})
export class RdvComponent implements OnInit {
  psychologues: any[] = []; // Initialisez un tableau pour stocker les psychologues

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllPsychologues(); // Appelez la méthode pour récupérer les psychologues au chargement du composant
  }

  getAllPsychologues() {
    this.userService.getAllUsersWithRole().subscribe(
      (data) => {
        console.log(Token);
        this.psychologues = data;
      },
      (error) => {
        console.error('Error fetching psychologues:', error);
      }
    );
  }


}