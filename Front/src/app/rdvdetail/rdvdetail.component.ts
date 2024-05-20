import { Component, OnInit } from '@angular/core';
import { Rdv } from '../Models/Rdv';
import { ActivatedRoute, Router } from '@angular/router';
import { PsychologueService } from '../services/psychologue.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-rdvdetail',
  templateUrl: './rdvdetail.component.html',
  styleUrl: './rdvdetail.component.css'
})
export class RdvdetailComponent implements OnInit {
  rendezVous: Rdv[] = [];

  calendarOptions: CalendarOptions = {
    plugins:  [dayGridPlugin, interactionPlugin, timeGridPlugin], // Importez les plugins ici
    initialView: 'dayGridMonth', // Vue initiale du calendrier
    dateClick: this.handleDateClick.bind(this),

    events: this.rendezVous.map(rdv => ({
      title: rdv.patient.nom + ' ' + rdv.patient.prenom,
      date: rdv.date,

    })),
    eventColor:'green'
  };
  constructor(private route: ActivatedRoute, 
    private psychologueService: PsychologueService, 
    private router: Router) { }
  ngOnInit(): void {
    this.getRendezVous(); // Appel à la méthode pour récupérer les rendez-vous lors de l'initialisation du composant

  }
  getRendezVous(): void {
    const psyId = this.route.snapshot.paramMap.get('id');
    if (psyId !== null) {
      this.psychologueService.getRendezVousPsy(psyId).subscribe(rendezVous => {
        this.rendezVous = rendezVous;
        console.log('Rendez-vous récupérés :', this.rendezVous); // Affiche les rendez-vous sur la console
        this.updateCalendarEvents(); // Mettre à jour les événements du calendrier après la récupération des rendez-vous

      });
    }
  }
  updateCalendarEvents(): void {
    this.calendarOptions.events = this.rendezVous.map(rdv => ({
      title: rdv.patient.nom + ' ' + rdv.patient.prenom,
      date: rdv.date
    }));
  }
  
  handleDateClick(arg: any) {
    const clickedDate = arg.dateStr;
    const psyId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/hpsy', psyId, { date: clickedDate }]); // Assurez-vous que vous naviguez vers '/hpsy/:id'
  }

}