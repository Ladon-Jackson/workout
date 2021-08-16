
import { useForm } from "react-hook-form";
import { useContext } from "react";
import WorkoutModel from "../../models/WorkoutModel";
import ExerciseModel from "../../models/ExerciseModel";
import { addWorkout } from "../../Connector";
import { WorkoutContext } from "../../context/WorkoutContext";
import SetModel from "../../models/SetModel";
import AddSetFormView from "./AddSetFormView";

export interface FormValues {
  reps: number,
  weight: number
}

interface Props {
  workout: WorkoutModel,
  idx: number
}

const AddExerciseForm: React.FC<Props> = ({workout, idx}) => {

  const {setWorkouts} = useContext(WorkoutContext)
  const {control, handleSubmit} = useForm<FormValues>();

  const constructAndAddExercise: (formValues: FormValues) => void = ({reps, weight}) => {

    const newSet: SetModel = {
      reps: reps,
      weight: weight
    }
    console.log("new set")
    console.log(JSON.stringify(newSet))

    const updatedExercise: ExerciseModel = {
      ...workout.exercises[idx],
      sets: [
        ...workout.exercises[idx].sets,
        newSet
      ]
    }
    console.log("updated exercise")
    console.log(JSON.stringify(updatedExercise))

    const updatedWorkout: WorkoutModel = {
      ...workout,
      exercises: [
        ...workout.exercises.slice(0, idx),
        updatedExercise,
        ...workout.exercises.slice(idx+1)
      ]
    }
    console.log("updated workout")
    console.log(JSON.stringify(updatedWorkout))

    addWorkout(updatedWorkout, setWorkouts)
  }

  return (
    <AddSetFormView
      handleSubmit={handleSubmit(constructAndAddExercise)}
      control={control}
    />
  );
}

export default AddExerciseForm;


  