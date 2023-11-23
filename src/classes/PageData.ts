import path from "path";
import { TeamMember } from "../interfaces/TeamMember";
import { TeamMembersManager } from "./TeamMembersManager";

export class PageData {
  title: string;
  content: TeamMember[];

  constructor(title: string) {
    this.title = title;
    this.content = this.fetchNames();
  }

  fetchNames(): TeamMember[] {
    const rootPath = process.cwd();
    const teamMembersFilePath = path.join(
      rootPath,
      "src/public/data/names/",
      "default.json"
    );
    const teamManager = new TeamMembersManager(teamMembersFilePath);
    return teamManager.getTeamMembers();
  }
}
