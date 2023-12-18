export const toDate =  (date: Date) =>
	new Intl.DateTimeFormat("ru").format(date)

export const fromDate = (date: string) =>
	new Date(date.replace(/(\d{2})\.(\d{2})\.(\d{4})/, "$3-$2-$1"))
