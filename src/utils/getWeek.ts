import { getWeek } from 'date-fns'

export const weekNumber = getWeek(new Date(), {
	weekStartsOn: 1,
	firstWeekContainsDate: 1,
})
