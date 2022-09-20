import { getWeek } from 'date-fns'

export const weekNumber = getWeek(new Date(), {
	weekStartsOn: 1,
	/* firstWeekContainsDate is set as per ISO 8601. This is valid for EU (exc. Portugal)
	 * and most of other European countries, most of Asia and Oceania.
	 * See https://en.wikipedia.org/wiki/Week#Week_numbering . */
	firstWeekContainsDate: 4,
})
