import { HandPalm, Play } from 'phosphor-react'

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { createContext, useState } from 'react'
import { Countdown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycleForm'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  InterruptedDate: Date
}

interface CyclesContextData {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo deve ser de no mínimo 5 minutos')
    .max(60, 'O ciclo deve ser de no mínimo 5 minutos'),
})

export const CyclesContext = createContext({} as CyclesContextData)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, InterruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCyclce: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
      InterruptedDate: new Date(),
    }

    setCycles((state) => [...state, newCyclce])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    // Reset values to default
    reset()
  }

  function handleInterruptCycle() {
    markCycleAsFinished()
  }

  // Catch erros messages from zod
  // console.log(formState.errors)

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={handleInterruptCycle}>
            Interromper
            <HandPalm size={24} />
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            Começar
            <Play size={24} />
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
