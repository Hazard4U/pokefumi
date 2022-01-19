import { Match } from '../models/Match'
import MatchService from '../services/matchService'

const matchService = new MatchService()

const listMatchs = (): Match[] => {
    return matchService.getAllMatchs()
}

const findMatch = (matchId: number): Match => {
    return matchService.getMatchById(matchId)
}

const addMatch = (match: Partial<Match>): Match[] => {
    matchService.createMatch(match.userId1);
    return matchService.getAllMatchs()
}

export { listMatchs, findMatch, addMatch }