import { Check } from "phosphor-react";
import AppCheckBox from "./AppCheckBox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const NewHabitForm = () => {

  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>();

  const availableWeeksDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sabádo'
  ]

  const createNewHabit = async (event: FormEvent) => {
    event.preventDefault();
    if (!title || weekDays?.length === 0) {
      return false;
    }
    api.post('habits', {
      title,
      weekDays
    })
    setTitle('');
    setWeekDays([]);
    alert('habito criado com sucesso')
  }

  const handleToggle = (value: number) => {
    console.log("LOAD");

    if (weekDays?.includes(value)) {
      const returnListRemoveItem = weekDays.filter(item => item !== value);
      setWeekDays(returnListRemoveItem);
    } else {
      const returnListAddItem = weekDays ? [...weekDays, value] : [value];
      setWeekDays(returnListAddItem);
    }
  }

  const myFunction = () => {
    console.log('click');
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc ..."
        className="
        p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400
        focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900
        "
        onChange={event => setTitle(event.target.value)}
        autoFocus
        value={title}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeeksDays.map((WeekDay, index) => (
          <AppCheckBox
            key={`${WeekDay}-${index}`}
            text={WeekDay}
            lineInText={false}
            checked={weekDays?.includes(index)}
            handleToggle={() => handleToggle(index)}
          />
        ))}
      </div>

      <button type="submit"
        className="
        mt-6 rounded-lg p-4 flex item-center gap-3 font-semibold bg-green-600 justify-center hover:bg-green-500 transition-colors
        focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900
        "
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}

export default NewHabitForm;