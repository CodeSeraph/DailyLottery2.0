import { Contestant } from "../interfaces/Contestant";
import { ContestantsManager } from "./ContestantsManager";

export class PageData {
  title: string;
  names: Contestant[];

  constructor(title: string) {
    this.title = title;
    this.names = this.fetchNames();
  }

  fetchNames(): Contestant[] {
    const teamManager = new ContestantsManager();
    return teamManager.getContestants();
  }
}
