import { Play } from 'phosphor-react'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  Separator,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <FormContainer action="">
        <div>
          <label>Vou trabalhar em</label>
          <input id="taks" />

          <label>Durante</label>
          <input type="number" id="minutesAmount" />
          <span>minutos</span>
        </div>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <button type="submit">
          Começar <Play size={24} />
        </button>
      </FormContainer>
    </HomeContainer>
  )
}
