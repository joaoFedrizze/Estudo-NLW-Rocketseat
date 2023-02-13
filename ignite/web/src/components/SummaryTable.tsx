import React from 'react'
import { generateDatesFromYearBeginning } from '../utils/generates-from-year-beggining';
import HabitDay from './HabitDay'

const SummaryTable = () => {
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  const summaryDates = generateDatesFromYearBeginning();

  const minimumSummaryDateSize = 18 * 7;
  const amoutOfDaysToFill = minimumSummaryDateSize - summaryDates.length;

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3" >
        {weekDays.map((weekDay, i) => {
          return (
            <div key={`${weekDay}-${i}`} className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold">
              {weekDay}
            </div>
          )
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map(date => {
          return (<HabitDay amount={5} completed={Math.random() * 5} key={date.toString()} />)
        })}

        {amoutOfDaysToFill > 0 && Array.from({ length: amoutOfDaysToFill }).map((_, i) => {
          return (<HabitDay amount={0} completed={0} disabled={true} key={i} />)
        })}
      </div>
    </div>
  )
}

export default SummaryTable;