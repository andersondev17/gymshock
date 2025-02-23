


const Excercises = ({ exercises, setExercises, bodyPart }) => {
  return (
    <div
      id='excercises'
      className='flex flex-col items-center justify-center w-full h-full p-4 space-y-4 bg-gray-100'
    >
      <h3 className='text-2xl font-bold mb-9'>
        Showing results for:{' '}
        <span className='text-primary font-bold'>{bodyPart}</span>
      </h3>


    </div>
  )
}

export default Excercises