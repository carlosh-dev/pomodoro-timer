import { HeaderContainer } from './styles'
import { Timer, Scroll } from 'phosphor-react'
import logoIgnite from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />

      <nav>
        <NavLink to="/" end title="Timer">
          <Timer size={20} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={20} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
