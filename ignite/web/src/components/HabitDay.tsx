interface IHabiyDay {
  disabled?: boolean
}

function HabitDay(props: IHabiyDay) {

  return (
    <div className={`
      w-10 
      h-10
      bg-zinc-900 
      border-2
      border-zinc-800
      rounded-lg 
      ${props.disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
    />
  )
}

export default HabitDay;