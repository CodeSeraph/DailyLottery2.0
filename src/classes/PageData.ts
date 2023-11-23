import { Contestants } from "../interfaces/Contestants";
import { ContestantsManager } from "./ContestantsManager";

export class PageData {
  title: string;
  names: Contestants[];

  constructor(title: string) {
    this.title = title;
    this.names = this.fetchNames();
  }

  fetchNames(): Contestants[] {
    const teamManager = new ContestantsManager();
    return teamManager.getContestants();
  }
}
