import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { HouseKeeping, RoomInfo } from '../../room-info';
import { MatDialog } from '@angular/material/dialog';
import { CloseDialogComponent } from './close-dialog/close-dialog.component';
import { ArrayFiltroService } from 'src/app/servicios/array-filtro.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

export class PrincipalComponent implements OnInit, OnDestroy {

  @Input() habitaciones!: RoomInfo[];
  aux: RoomInfo[] = [];
  subscriptions: Subscription[] = [];

  constructor(public dialog: MatDialog, private arrayFiltro:ArrayFiltroService) {

  }

  ngOnInit(): void {
    this.aux = JSON.parse(JSON.stringify(this.habitaciones));
    this.subscriptions.push(
      this.arrayFiltro.sendArray.subscribe((resp:RoomInfo[]) => {
      this.aux = resp;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => subscription.unsubscribe());
  }

  roomStatus(status:HouseKeeping):string {
    let resul = '';
    switch(status) {
      case 'DIRTY':
        resul = 'sucia';
      break;

      case 'CLEAN':
        resul = 'limpia';
      break;

      case 'PENDING_REVIEW':
        resul = 'revisada';
      break;

    }
    return resul;
  }

  openDialog(habitacion:RoomInfo): void {
    const dialogRef = this.dialog.open(CloseDialogComponent, {
      width: '600px',
      data: habitacion
    });
  }
}

