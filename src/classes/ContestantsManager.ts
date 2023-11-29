import * as fs from "fs";
import { Contestant } from "../interfaces/Contestant";
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

export class ContestantsManager {
  private defaultNamesPath: string = defaultNamesFilePath;
  private workingNamesPath: string = workingNamesFilePath;

  constructor() {
    this.refreshNamesList();
  }

  private readJsonFile(filePath: string): Contestant[] {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data).contestants as Contestant[];
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

  private getDefaultContestants(): Contestant[] {
    return this.readJsonFile(this.defaultNamesPath);
  }

  private getWorkingContestants(): Contestant[] {
    return this.readJsonFile(this.workingNamesPath);
  }

  private refreshNamesList(): void {
    if (this.newWeekStarted() || !this.getWorkingContestants()?.length) {
      this.writeJsonFile(this.workingNamesPath, {
        contestants: this.getDefaultContestants(),
      });
    }
  }

  private shuffle(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    // order by enabled first
    array.sort(this.orderByEnabled);

    return array;
  }

  private orderByEnabled(a: Contestant, b: Contestant) {
    // Convert boolean values to integers (true becomes 1, false becomes 0)
    const enabledA = a.enabled ? 1 : 0;
    const enabledB = b.enabled ? 1 : 0;

    // Compare the values
    return enabledB - enabledA;
  }

  getContestants(): Contestant[] {
    const contestants = this.getWorkingContestants();
    return this.shuffle(contestants);
  }

  //   addTeamMember(name: string): void {
  //     const Contestants = this.readJsonFile();
  //     const newTeamMember: TeamMember = {
  //       name: name,
  //     };
  //     Contestants.push(newTeamMember);
  //     this.writeJsonFile(Contestants);
  //   }

  //   updateTeamMember(oldName: string, newName: string): void {
  //     const Contestants = this.readJsonFile();
  //     const memberIndex = Contestants.findIndex(
  //       (member) => member.name === oldName
  //     );

  //     if (memberIndex !== -1) {
  //       Contestants[memberIndex].name = newName;
  //       this.writeJsonFile(Contestants);
  //     } else {
  //       console.error("Team member not found with name:", oldName);
  //     }
  //   }

  deleteTeamMember(name: string): void {
    const contestants = this.getWorkingContestants();
    const updatedContestants = contestants.filter(
      (contestant) => contestant.name !== name
    );
    this.writeJsonFile(this.workingNamesPath, {
      contestants: updatedContestants,
    });
  }

  disableTeamMember(name: string): void {
    const contestants = this.getWorkingContestants();
    const updatedContestants = contestants.map((contestant) => {
      if (contestant.name === name) {
        contestant.enabled = false;
      }
      return contestant;
    });
    this.writeJsonFile(this.workingNamesPath, {
      contestants: updatedContestants,
    });
  }
}
