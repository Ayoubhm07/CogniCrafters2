import { Component, OnInit } from '@angular/core';
import { PaiementsService } from '../../paiements.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  payments: any[] = [];

  constructor(private paymentService: PaiementsService) { }

  ngOnInit(): void {
    this.paymentService.getPayments().subscribe(data => {
      console.log(data); // Vérifiez les données renvoyées par le service

      this.payments = data;
    });
  }
}