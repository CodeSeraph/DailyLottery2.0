import * as fs from "fs";
import { TeamMember } from "../interfaces/TeamMember";
import path from "path";

const rootPath = process.cwd();
const defaultNamesFilePath = path.join(
  rootPath,
  "src/public/data/names/",
  "default.json"
);
const workingNamesFilePath = path.join(
  rootPath,
  "src/public/data/names/",
  "working.json"
);

export class TeamMembersManager {
  private defaultNamesPath: string = defaultNamesFilePath;
  private workingNamesPath: string = workingNamesFilePath;

  constructor() {
    this.refreshNamesList();
  }

  private readJsonFile(filePath: string): TeamMember[] {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data).names as TeamMember[];
    } catch (error) {
      console.error("Error reading JSON file:", error);
      return [];
    }
  }

  private writeJsonFile(filePath: string, data: any): void {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      console.error("Error writing to JSON file:", error);
    }
  }

  private newWeekStarted(): boolean {
    const today = new Date();
    const currentDay = today.getDay(); // Returns a number from 0 (Sunday) to 6 (Saturday)

    // Check if day is Monday
    return currentDay === 1;
  }

  private getDefaultNames(): TeamMember[] {
    return this.readJsonFile(this.defaultNamesPath);
  }

  private getWorkingNames(): TeamMember[] {
    return this.readJsonFile(this.workingNamesPath);
  }

  private refreshNamesList(): void {
    if (this.newWeekStarted() || !this.getWorkingNames()?.length) {
      this.writeJsonFile(this.workingNamesPath, {
        names: this.getDefaultNames(),
      });
    }
  }

  private shuffle(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getTeamMembers(): TeamMember[] {
    const names = this.getWorkingNames();
    return this.shuffle(names);
  }

  //   addTeamMember(name: string): void {
  //     const teamMembers = this.readJsonFile();
  //     const newTeamMember: TeamMember = {
  //       name: name,
  //     };
  //     teamMembers.push(newTeamMember);
  //     this.writeJsonFile(teamMembers);
  //   }

  //   updateTeamMember(oldName: string, newName: string): void {
  //     const teamMembers = this.readJsonFile();
  //     const memberIndex = teamMembers.findIndex(
  //       (member) => member.name === oldName
  //     );

  //     if (memberIndex !== -1) {
  //       teamMembers[memberIndex].name = newName;
  //       this.writeJsonFile(teamMembers);
  //     } else {
  //       console.error("Team member not found with name:", oldName);
  //     }
  //   }

  deleteTeamMember(name: string): void {
    const teamMembers = this.getWorkingNames();
    const updatedTeamMembers = teamMembers.filter(
      (member) => member.name !== name
    );
    this.writeJsonFile(this.workingNamesPath, { names: updatedTeamMembers });
  }
}
