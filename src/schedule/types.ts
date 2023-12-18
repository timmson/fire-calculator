export type RequestType = {
    startAmount: number,
    monthlyAmount: number,
    startDate: Date,
    incomeRate: number,
	taxContributionRecover: boolean
    taxContributionRecoverLimit: number,
	taxIncomeFree: boolean
    targetIncome: number,
    taxRate: number
}

export type ScheduleIncrementType = {
    date: Date,
    initialBalance: number,
    monthlyRate: number,
    taxRate: number,

    incrementAmount?: number,
    taxAmount?: number,
    projectedTaxAmount?: number,
    monthlyAmount?: number,
    recoverAmount?: number,
    dividendAmount?: number
    finalBalance?: number
}

export type ScheduleType = {
    termInYear?: number,
    lastPaymentDate?: Date,
    targetAmount?: number,
    increments: Array<ScheduleIncrementType>;

}

