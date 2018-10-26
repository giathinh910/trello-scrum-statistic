import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../../shared/services/statistic.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';

interface Sprint {
  sprintName: string;
  totalEstimated: number;
  totalConsumed: number;
  cards: any[];
}

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss']
})
export class BoardDetailComponent implements OnInit {
  errMessage: string;
  board;
  cardsBySprint: Sprint[];
  columnsToPrint = ['name', 'shortUrl', 'estimatedPoint', 'consumedPoint'];

  constructor(private statisticService: StatisticService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getBoard();
  }

  private getBoard() {
    const boardId = this.activatedRoute.snapshot.params['boardId'];

    const board$ = this.statisticService.getBoardDetail(boardId);
    const cards$ = this.statisticService.getBoardCards(boardId);
    const lists$ = this.statisticService.getBoardLists(boardId);

    forkJoin(board$, cards$, lists$).subscribe(
      results => {
        const [board, cards, lists] = results;
        let cardsTmp = [];
        cardsTmp = this.filterActiveCards(lists, cards);
        cardsTmp = this.extractPointsFromCards(cardsTmp);
        this.cardsBySprint = this.groupCardsBySprint(cardsTmp);
      },
      (err: HttpErrorResponse) => this.errMessage = err.error.message
    );
  }

  private filterActiveCards(lists: any[], cards: any[]): any[] {
    const backLogListIndex = lists.findIndex(list => list.name.toLowerCase() === 'backlog');
    const backLogListId = lists[backLogListIndex].id;
    return cards.filter(card => card.idList !== backLogListId);
  }

  private extractPointsFromCards(cards: any[]): any[] {
    return cards.map(card => {
      card['storyPoint'] = {};
      const hasEstimatedPoint = card.name.match(/\([0-9]\)/g);
      if (hasEstimatedPoint) {
        const estimatedPoint = hasEstimatedPoint[0].match(/[0-9]/g);
        card['storyPoint']['estimatedPoint'] = parseInt(estimatedPoint[0]);
      } else {
        card['storyPoint']['estimatedPoint'] = 0;
      }
      const hasConsumedPoint = card.name.match(/\[[0-9]\]/g);
      if (hasConsumedPoint) {
        const consumedPoint = hasConsumedPoint[0].match(/[0-9]/g);
        card['storyPoint']['consumedPoint'] = parseInt(consumedPoint[0]);
      } else {
        card['storyPoint']['consumedPoint'] = 0;
      }
      return card;
    });
  }

  private groupCardsBySprint(cards: any[]): any[] {
    return cards.reduce((sprints: Sprint[], card) => {
      const hasSprintName = card.name.match(/\[\bsprint\S*[0-9]\]/g);
      if (hasSprintName) {
        const sprintName = hasSprintName[0];
        if (!sprints.length) {
          sprints.push({
            sprintName,
            totalEstimated: card.storyPoint.estimatedPoint,
            totalConsumed: card.storyPoint.consumedPoint,
            cards: []
          });
          sprints[0].cards.push(card);
        } else {
          const sprintIndex = this.getSprintIndex(sprints, sprintName);
          if (sprintIndex === -1) {
            sprints.push({
              sprintName,
              totalEstimated: card.storyPoint.estimatedPoint,
              totalConsumed: card.storyPoint.consumedPoint,
              cards: []
            });
            sprints[this.getSprintIndex(sprints, sprintName)].cards.push(card);
          } else {
            sprints[sprintIndex].cards.push(card);
            sprints[sprintIndex].totalEstimated += card.storyPoint.estimatedPoint;
            sprints[sprintIndex].totalConsumed += card.storyPoint.consumedPoint;
          }
        }
      }
      return sprints;
    }, []);
  }

  private getSprintIndex(cardsBySprint: Sprint[], sprintNameToFind: string): number {
    return cardsBySprint.findIndex(sprint => {
      return sprint.sprintName === sprintNameToFind;
    });
  }
}
