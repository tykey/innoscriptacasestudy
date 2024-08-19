import { useState } from 'react'
import ManualInput from '../../shared/components/input/manualInput/ManualInput'
import { COUNTRIES } from '../../shared/constants/misc'
import { HOME_PATH } from '../../shared/constants/paths'
import { Country, User } from '../../shared/constants/types'
import {
  BoldSpan,
  ClickableSpanWrapper,
  DefaultSpan,
} from '../../shared/styles/General.styled'
import eng from '../../shared/translations/eng'
import { LandingPageWrapper, LoginDiv } from './LandingPage.styled'
import { useNavigate } from 'react-router-dom'
import DefaultButton from '../../shared/components/buttons/defaultButton/DefaultButton'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser } from '../../shared/slices/sessionSlice'
import { IRootState } from '../../shared/store/store'
import { addUser } from '../../shared/slices/usersSlice'

const LandingPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUserIndex = useSelector(
    (state: IRootState) => state.sessionSlice.value
  )
  const users = useSelector((state: IRootState) => state.usersSlice.value)

  const [usernameInput, setUsernameInput] = useState<string>('')

  const onLogin = () => {
    if (usernameInput.length === 0) return

    const selectedUserIndex = users.findIndex(
      (user: User) => user.username === usernameInput
    )

    if (selectedUserIndex > -1) dispatch(loginUser(selectedUserIndex))
    else {
      const newUser: User = {
        username: usernameInput,
        filterPreferences: {
          sortBy: null,
          sources: [],
          category: null,
        },
      }
      dispatch(addUser(newUser))
      dispatch(loginUser(users.length))
    }

    goToHome()
  }

  const onContinueAnon = () => {
    dispatch(logoutUser(null))
    goToHome()
  }

  const goToHome = () => {
    navigate(`${HOME_PATH}`, { replace: true })
  }

  return (
    <LandingPageWrapper>
      <BoldSpan fontSize="1.6em">{eng.pages.landing_page.welcome}</BoldSpan>
      <LoginDiv>
        <ManualInput
          type="text"
          defaultValue={usernameInput}
          onChange={(value: any) => setUsernameInput(value)}
          onEnter={onLogin}
          placeholder={eng.pages.landing_page.username_placeholder}
          fontSize="0.7em"
        />
        <DefaultButton
          text={eng.pages.landing_page.enter(usernameInput)}
          onClick={onLogin}
          isDisabled={usernameInput.length === 0}
          fontSize="0.7em"
        />
        <ClickableSpanWrapper onClick={onContinueAnon}>
          <DefaultSpan fontSize="0.6em">
            {eng.pages.landing_page.continue_no_user}
          </DefaultSpan>
        </ClickableSpanWrapper>
      </LoginDiv>
    </LandingPageWrapper>
  )
}

export default LandingPage
