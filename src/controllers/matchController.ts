import { Match } from "../models/Match";
import MatchService from "../services/matchService";

export default class MatchController {
  static listMatchs = MatchService.getAllMatchs;

  static findMatch = MatchService.getMatchById;

  static addMatch = (userId: number): Match[] => {
    MatchService.createMatch(userId);
    return MatchService.getAllMatchs();
  };
}
