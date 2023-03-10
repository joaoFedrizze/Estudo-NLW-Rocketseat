interface IProgressBar {
  progress: number
}

const ProgressBar = (props: IProgressBar) => {
  return (
    <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
      <div
        role="progressbar"
        aria-label='Progresso de hábitos completados nesse dia'
        aria-valuenow={props.progress}
        className='h-3 rounded-xl bg-violet-600 w-3/4'
        style={{ width: `${props.progress}%`, transition: 'width 0.8s' }}
      />
    </div>
  );
}

export default ProgressBar;