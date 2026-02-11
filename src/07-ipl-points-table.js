/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
    if (!Array.isArray(matches) || matches.length === 0) return [];

    let table = {};

    for (let match of matches) {
        if (!(match.team1 in table)) {
            table[match.team1] = {};
            table[match.team1].team = match.team1;
            table[match.team1].played = 0;
            table[match.team1].won = 0;
            table[match.team1].lost = 0;
            table[match.team1].tied = 0;
            table[match.team1].noResult = 0;
            table[match.team1].points = 0;
        }

        if (!(match.team2 in table)) {
            table[match.team2] = {};
            table[match.team2].team = match.team2;
            table[match.team2].played = 0;
            table[match.team2].won = 0;
            table[match.team2].lost = 0;
            table[match.team2].tied = 0;
            table[match.team2].noResult = 0;
            table[match.team2].points = 0;
        }

        table[match.team1].played++;
        table[match.team2].played++;

        if (match.result === "win") {
            table[match.winner].won++;
            table[match.winner].points += 2;

            const loser =
                match.winner === match.team1 ? match.team2 : match.team1;
            table[loser].lost++;
        } else {
            if (match.result === "tie") {
                table[match.team1].tied++;
                table[match.team2].tied++;
            } else if (match.result === "no_result") {
                table[match.team1].noResult++;
                table[match.team2].noResult++;
            }

            table[match.team1].points++;
            table[match.team2].points++;
        }
    }

    return Object.values(table).sort(
        (a, b) => b.points - a.points || a.team.localeCompare(b.team),
    );
}
