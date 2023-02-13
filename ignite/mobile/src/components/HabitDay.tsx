import { TouchableOpacityProps, TouchableOpacity, Dimensions } from 'react-native'

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

interface IHabityDay extends TouchableOpacityProps {
  disabled?: boolean;
}

export function HabitDay({ disabled, ...rest }: IHabityDay) {
  return (
    <TouchableOpacity
      className={`
        bg-zinc-900 
        rounded-lg 
        border-2 m-1 
        border-zinc-800
        ${disabled ? 'opacity-40' : ''}
        `}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={disabled ? 0.4 : 0.7}
      {...rest}
    >

    </TouchableOpacity>
  )
}