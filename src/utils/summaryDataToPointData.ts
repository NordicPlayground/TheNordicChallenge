import type { StravaObject } from "app/pages/Strava"
import { getWeek } from "date-fns"
import type { PointData } from "./pointData2GraphData"

export type SummaryData = 
    {
      name: string
      distance: number,
      hours: number,
      clubPoints: number,
      elevation: number
    }[]
  

export const summaryDataToPointData = (data1: StravaObject, data2: StravaObject): PointData => {
	const result: PointData = [] as any
    const weekNumber = getWeek(data1.timestamp)
    console.log('weeknumber',weekNumber)
    /*
    //First summary can be added directly
    for (const officeData of data1){
        let clubName = officeData.name.split('- ').pop()
        if (clubName?.includes('Office')){
            clubName = clubName.slice(0,-7)
        }
        result.push({
            week: 38,
            club: clubName as string,
            points: officeData.clubPoints
        })
    }
    //Second and later summaries
    for (const officeDataWeek2 of data2){
        let clubName = officeDataWeek2.name.split('- ').pop()
        if (clubName?.includes('Office')){
            clubName = clubName.slice(0,-7)
        }
        let oldPoints = 0
        for (const res of result){
            if (res.club === clubName){
                oldPoints += res.points
            }
        }
        result.push({
            week: 39,
            club: clubName as string,
            points: officeDataWeek2.clubPoints + oldPoints
        })
        oldPoints = 0
    }
    console.log(result)*/
	return result
}