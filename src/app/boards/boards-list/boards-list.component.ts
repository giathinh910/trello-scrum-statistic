import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../../shared/services/statistic.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit {
  boards: any[];
  errMessage: string;
  columnsToPrint = ['name', 'id', 'action'];

  constructor(private statisticService: StatisticService,
              private router: Router) {
  }

  ngOnInit() {
    this.getBoards();
  }

  handleBoardClicked(boardId) {
    this.router.navigate(['boards', boardId, 'detail']);
  }

  private getBoards() {
    this.statisticService.getBoards().subscribe(
      boards => this.boards = boards,
      (err: HttpErrorResponse) => this.errMessage = err.error.message
    );
  }
}

