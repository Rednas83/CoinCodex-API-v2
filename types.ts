type firstPageHistory = {
  days: string | number, /** The number of days we need the history for */
  coins_limit: string | number, /** The number of top coins (by market cap) must be returned */
  samples?: string | number, /** [default: 1] - How many price values between the start_date and end_date to be included in the results. (i.e. if start_date: 2018-01-01, end_date: 2018-01-31, samples: 1. Only 1 value will be returned. If samples: 30, 30 values will be returned) */
}

type fetchHistory = {
  start_date: string, /** The start date of the historical data snapshot in YYYY-MM-DD. e.g. 2018-01-01 */
  end_date: string, /** The end date of the historical data snapshot in YYYY-MM-DD. e.g. 2018-01-31 */
  samples?: string | number /** [default: 1] - How many price values between the start_date and end_date to be included in the results. (i.e. if start_date: 2018-01-01, end_date: 2018-01-31, samples: 1. Only 1 value will be returned. If samples: 30, 30 values will be returned) */
}

/** Return object for requests in the class. Helper for reference */
type ReturnObject = {
  success: boolean, /** Whether the response status code returned a successful code (>200 && <300) */
  message: string, /** The response status message */
  code: number, /** The response status code */
  data: object /** The body data in json format from the request */
}

export { firstPageHistory, fetchHistory, ReturnObject }
