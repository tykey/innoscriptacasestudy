import { HeaderWrapper, LoginInfoDiv, LogoutWrapper } from './Header.styled'
import LogoSVG from '../../assets/logo/logo.svg'
import { BoldSpan } from '../../styles/General.styled'
import { INNO_MAIN_COLOR } from '../../constants/colors'
import eng from '../../translations/eng'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../store/store'
import LogoutIcon from '../../assets/icons/logout.svg'
import LoginIcon from '../../assets/icons/login.svg'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../slices/sessionSlice'
import { LANDING_PAGE_PATH } from '../../constants/paths'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentUserIndex = useSelector(
    (state: IRootState) => state.sessionSlice.value
  )
  const users = useSelector((state: IRootState) => state.usersSlice.value)

  const onLogout = () => {
    dispatch(logoutUser(null))
    navigate(LANDING_PAGE_PATH, { replace: true })
  }

  const onClickLogin = () => {
    navigate(LANDING_PAGE_PATH, { replace: true })
  }

  return (
    <HeaderWrapper>
      <LogoSVG />
      <LoginInfoDiv>
        {currentUserIndex > -1 ? (
          <>
            <BoldSpan color={INNO_MAIN_COLOR}>
              {eng.components.header.logged_in_as(
                users[currentUserIndex]?.username
              )}
            </BoldSpan>
            <LogoutWrapper onClick={onLogout}>
              <LogoutIcon />
            </LogoutWrapper>
          </>
        ) : (
          <>
            <BoldSpan color={INNO_MAIN_COLOR}>
              {eng.components.header.not_logged_in}
            </BoldSpan>
            <LogoutWrapper onClick={onClickLogin}>
              <LoginIcon />
            </LogoutWrapper>
          </>
        )}
      </LoginInfoDiv>
    </HeaderWrapper>
  )
}

export default Header
