import { Match } from './model'
import MatchRepository from './matchRepository'

const matchRepository = new MatchRepository()

const listMatchs = (): Match[] => {
    return matchRepository.getAllMatchs()
}

const findMatch = (matchId: number): Match => {
    return matchRepository.getMatchById(matchId)
}

const addMatch = (match: Partial<Match>): Match[] => {
    matchRepository.createMatch(match.userId1);
    return matchRepository.getAllMatchs()
}

export { listMatchs, findMatch, addMatch }