export enum Privilege {
    NONE = "NONE",
    A = "A",
    B = "B"
}

export type RequestType = {
    taxPrivilegeMonthlyAmount: number,
    startAmount: string,
    monthlyAmount: string,
    startDate: Date,
    rate: number,
    tax: number,
    taxPrivilege: Privilege,
    taxPrivilegeAmount: number,
    targetIncome: number,
    monthlyRate: number,
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
    dividendAmount?: number
    finalBalance?: number
}

export type ScheduleType = {
    termInYear?: number,
    lastPaymentDate?: Date,
    targetAmount?: number,
    increments: Array<ScheduleIncrementType>;

}

