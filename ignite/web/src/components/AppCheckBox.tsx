import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import React, { Dispatch, SetStateAction } from "react";

interface IAppCheckBox {
  text: string;
  lineInText: boolean;
  onCheckedChange?: Dispatch<SetStateAction<number[] | undefined>>,
  checkList?: number[],
  checkListValue?: number,
  checked?: boolean,
}

const AppCheckBox = ({ ...props }: IAppCheckBox) => {

  const { text, lineInText, onCheckedChange, checkListValue, checkList, checked } = props;

  const handleToggleWeekDay = (value: number) => {
    if (checkList?.includes(value)) {
      const returnListRemoveItem = checkList.filter(item => item !== value);
      onCheckedChange(returnListRemoveItem);
    } else {
      const returnListAddItem = checkList ? [...checkList, value] : [value];
      onCheckedChange(returnListAddItem);
    }
  }

  return (
    <Checkbox.Root
      onCheckedChange={() => { onCheckedChange && handleToggleWeekDay(checkListValue || 0) }}
      className='flex items-center group'
      checked={checked}
    >
      <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
        <Checkbox.Indicator>
          <Check size={20} className="text-white" />
        </Checkbox.Indicator>
      </div>

      <span className={`text-white leading-tight ml-3 ${lineInText ? `font-bold text-xl group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400` : ``}`}>
        {text}
      </span>
    </Checkbox.Root>
  )
}

export default AppCheckBox;