import * as fs from "fs";
import { TeamMember } from "../interfaces/TeamMember";

export class TeamMembersManager {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  private readJsonFile(): TeamMember[] {
    try {
      const data = fs.readFileSync(this.filePath, "utf-8");
      return JSON.parse(data) as TeamMember[];
    } catch (error) {
      console.error("Error reading JSON file:", error);
      return [];
    }
  }

  private writeJsonFile(data: TeamMember[]): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      console.error("Error writing to JSON file:", error);
    }
  }

  getTeamMembers(): TeamMember[] {
    return this.readJsonFile();
  }

  addTeamMember(name: string): void {
    const teamMembers = this.readJsonFile();
    const newTeamMember: TeamMember = {
      name: name,
    };
    teamMembers.push(newTeamMember);
    this.writeJsonFile(teamMembers);
  }

  updateTeamMember(oldName: string, newName: string): void {
    const teamMembers = this.readJsonFile();
    const memberIndex = teamMembers.findIndex(
      (member) => member.name === oldName
    );

    if (memberIndex !== -1) {
      teamMembers[memberIndex].name = newName;
      this.writeJsonFile(teamMembers);
    } else {
      console.error("Team member not found with name:", oldName);
    }
  }

  deleteTeamMember(name: string): void {
    const teamMembers = this.readJsonFile();
    const updatedTeamMembers = teamMembers.filter(
      (member) => member.name !== name
    );
    this.writeJsonFile(updatedTeamMembers);
  }

  replaceFileContents(newData: TeamMember[]): void {
    this.writeJsonFile(newData);
  }
}
