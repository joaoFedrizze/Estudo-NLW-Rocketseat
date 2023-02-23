import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import HabitList from './HabitList';
import ProgressBar from './ProgressBar';

interface IHabitDay {
  disabled?: boolean,
  amount: number,
  defaultCompleted: number,
  date: Date,
}

export interface HabitsInfo {
  possibleHabits: Array<{
    id: string,
    title: string,
    created_at: string

  }>,
  completedHabits: string[],
}

function HabitDay({ ...props }: IHabitDay) {
  const { defaultCompleted, amount, disabled, date } = props;

  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>({ possibleHabits: [{ id: '', title: '', created_at: '' }], completedHabits: [] });
  const [completed, setCompleted] = useState(defaultCompleted)

  const completedPercentage = Math.round((completed / amount) * 100);

  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  const handleCompletedChange = (value: number) => {
    //console.log(habitsInfo.completedHabits.length);
    //setCompleted(habitsInfo.completedHabits.length);
  }

  useEffect(() => {
    if (date !== undefined) {
      api.get('day', {
        params: {
          date: date.toISOString()
        }
      }).then(response => {
        setHabitsInfo(response.data);
      })
    }
  }, [])

  useEffect(() => {
    console.log(habitsInfo.completedHabits.length);
    setCompleted(habitsInfo.completedHabits.length);
  }, [habitsInfo])

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(`
          w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors
          focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background
          ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
        `,
          {
            'bg-zinc-900 border-zinc-800': completedPercentage === 0,
            'bg-violet-900 border-violet-700': completedPercentage > 0 && completedPercentage < 20,
            'bg-violet-800 border-violet-600': completedPercentage >= 20 && completedPercentage < 40,
            'bg-violet-700 border-violet-500': completedPercentage >= 40 && completedPercentage < 60,
            'bg-violet-600 border-violet-500': completedPercentage >= 60 && completedPercentage < 80,
            'bg-violet-500 border-violet-400': completedPercentage >= 80,
          }
        )}
      />

      {!disabled ? (
        <Popover.Portal>
          <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
            <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
            <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>

            <ProgressBar progress={completedPercentage} />

            {date ? (
              <HabitList
                date={date}
                handleCompletedChange={() => handleCompletedChange(completed)}
                setHabitsInfo={setHabitsInfo}
                habitsInfo={habitsInfo} />
            ) : null}


            <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
          </Popover.Content>
        </Popover.Portal>
      ) : null}
    </Popover.Root>
  )
}

export default HabitDay;