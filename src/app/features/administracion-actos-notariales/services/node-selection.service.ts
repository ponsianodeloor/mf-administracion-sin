import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeSelectionService {
  private selectedNode = new BehaviorSubject<any>(null);
  selectedNode$ = this.selectedNode.asObservable();

  private saveEvent = new BehaviorSubject<any>(null);
  saveEvent$ = this.saveEvent.asObservable();

  setSelectedNode(node: any) {
    this.selectedNode.next(node);
  }

  emitSaveEvent(data: any) {
    this.saveEvent.next(data);
  }
}
