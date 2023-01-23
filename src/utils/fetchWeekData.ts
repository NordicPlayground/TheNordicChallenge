export const fetchWeekData = async () => {
    const weekData = []
    for(let weekNum = 4; weekNum<10; weekNum++) {
        try {
            const res = await fetch(`https://lenakh97.github.io/Nordic-strava-application/summary-week-${weekNum.toString().padStart(2, '0')}.json?`)
            weekData.push(await res.json())
        } catch {
            // Pass, week does not exist
        }
    }
    return weekData
}
