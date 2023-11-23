import { TeamMember } from "../interfaces/TeamMember";
import { TeamMembersManager } from "./TeamMembersManager";

export class PageData {
  title: string;
  names: TeamMember[];

  constructor(title: string) {
    this.title = title;
    this.names = this.fetchNames();
  }

  fetchNames(): TeamMember[] {
    const teamManager = new TeamMembersManager();
    return teamManager.getTeamMembers();
  }
}
