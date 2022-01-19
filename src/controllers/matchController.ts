import { Match } from "../models/Match";
import MatchService from "../services/matchService";

const matchService = new MatchService();

export default class MatchController {
  static listMatchs = matchService.getAllMatchs;

  static findMatch = matchService.getMatchById;

  static addMatch = (userId: number): Match[] => {
    matchService.createMatch(userId);
    return matchService.getAllMatchs();
  };
}
