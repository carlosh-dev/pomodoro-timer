import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

import { useFormContext } from 'react-hook-form'

import { useContext } from 'react'
import { CyclesContext } from '../..'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label>Vou trabalhar em</label>
      <TaskInput
        id="taks"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Trabalho" />
        <option value="Estudo de React" />
        <option value="Estudo de CSS" />
        <option value="Estudo de Backend" />
      </datalist>

      <label>Durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        disabled={!!activeCycle}
        step={5}
        min={1}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos</span>
    </FormContainer>
  )
}
