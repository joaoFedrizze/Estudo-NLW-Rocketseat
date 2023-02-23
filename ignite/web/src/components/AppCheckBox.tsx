import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

interface IAppCheckBox {
  text: string;
  lineInText: boolean;
  checked?: boolean,
  disabled?: boolean,
  handleCompletedChange?: (completed: number) => void
  handleToggle: () => void
}

const AppCheckBox = ({ ...props }: IAppCheckBox) => {

  const { text, lineInText, checked, disabled, handleToggle } = props;

  return (
    <Checkbox.Root
      onCheckedChange={handleToggle}
      className='flex items-center group focus:outline-none'
      checked={checked}
      disabled={disabled}
      style={disabled ? { cursor: "not-allowed" } : {}}
    >
      <div className='
      h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors 
      group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900
      '>
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