import dayjs from "dayjs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { api } from "../lib/axios";
import AppCheckBox from "./AppCheckBox";
import { HabitsInfo } from "./HabitDay";

interface IHabitList {
  setHabitsInfo: Dispatch<SetStateAction<HabitsInfo>>,
  habitsInfo: HabitsInfo,
  handleCompletedChange: (completed: number) => void,
  date: Date,
}

const HabitList = ({ ...props }: IHabitList) => {

  const { date, handleCompletedChange, habitsInfo, setHabitsInfo } = props;

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  const handleToggle = async (value: string) => {

    await api.patch(`/habits/${value}/toggle`);

    const isHabitAlreadyCompleted = habitsInfo?.completedHabits.includes(value);

    if (isHabitAlreadyCompleted) {
      setHabitsInfo({
        possibleHabits: habitsInfo!.possibleHabits,
        completedHabits: habitsInfo!.completedHabits.filter(id => id !== value),
      })

      handleCompletedChange(habitsInfo!.completedHabits.filter(id => id !== value).length)
    } else {
      setHabitsInfo({
        possibleHabits: habitsInfo!.possibleHabits,
        completedHabits: [...habitsInfo!.completedHabits, value],
      })
      handleCompletedChange(habitsInfo!.completedHabits.filter(id => id !== value).length)
    }
  }

  return (<>
    {habitsInfo?.possibleHabits.map((habit) => (
      <div key={habit.id} className='mt-6 flex flex-col gap-3'>
        <AppCheckBox
          text={habit.title}
          lineInText={true}
          checked={habitsInfo.completedHabits.includes(habit.id)}
          disabled={isDateInPast}
          handleToggle={() => handleToggle(habit.id)}
        />
      </div>

    ))}

  </>)
}

export default HabitList;