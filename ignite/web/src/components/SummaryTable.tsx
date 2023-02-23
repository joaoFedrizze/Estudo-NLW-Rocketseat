import dayjs from 'dayjs';
import { useState } from 'react'
import { api } from '../lib/axios';
import { generateDatesFromYearBeginning } from '../utils/generates-from-year-beggining';
import HabitDay from './HabitDay'

type SummaryTable = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>

const SummaryTable = () => {
  const [summary, setSummary] = useState<SummaryTable[]>([]);

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  const summaryDates = generateDatesFromYearBeginning();

  const minimumSummaryDateSize = 18 * 7;
  const amoutOfDaysToFill = minimumSummaryDateSize - summaryDates.length;

  useState(() => {
    api.get('summary').then(response => {
      setSummary(response.data);
    })
  }, [])

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
        {summary.length > 0 && summaryDates.map(date => {
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day')
          })
          return (<HabitDay
            date={date}
            amount={dayInSummary?.amount}
            defaultCompleted={dayInSummary?.completed}
            key={date.toString()} />)
        })}

        {amoutOfDaysToFill > 0 && Array.from({ length: amoutOfDaysToFill }).map((_, i) => {
          return (<HabitDay amount={0} defaultCompleted={0} disabled={true} key={i} />)
        })}
      </div>
    </div>
  )
}

export default SummaryTable;