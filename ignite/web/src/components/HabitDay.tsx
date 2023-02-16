import * as Checkbox from '@radix-ui/react-checkbox';
import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import AppCheckBox from './AppCheckBox';
import ProgressBar from './ProgressBar';

interface IHabiyDay {
  disabled?: boolean,
  amount: number,
  completed: number,
  date?: Date,
}

function HabitDay({ ...props }) {
  const { completed = 0, amount = 0, disabled, date, checked } = props;

  const completedPercentage = Math.round((completed / amount) * 100);

  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  return (
    <Popover.Root>
      <Popover.Trigger className={clsx(`
          w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg 
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

            <ProgressBar progress={75} />

            <div className='mt-6 flex flex-col gap-3'>
              <AppCheckBox
                text={'comer um hamburgão'}
                lineInText={true}
              />
            </div>

            <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
          </Popover.Content>
        </Popover.Portal>
      ) : null}
    </Popover.Root>
  )
}

export default HabitDay;