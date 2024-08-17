import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landingPage/LandingPage'
import ContentWrapper from './shared/layout/content/ContentWrapper'
import Header from './shared/layout/header/Header'
import { HOME_PATH, LANDING_PAGE_PATH } from './shared/constants/paths'
import Homepage from './pages/homepage/Homepage'

const App = () => {
  return (
    <>
      <Header />
      <ContentWrapper>
        <Routes>
          <Route path={LANDING_PAGE_PATH} element={<LandingPage />} />
          <Route path={HOME_PATH} element={<Homepage />} />
          <Route path="/" element={<Navigate to={HOME_PATH} />} />
          <Route path="/*" element={<Navigate to={HOME_PATH} />} />
        </Routes>
      </ContentWrapper>
    </>
  )
}

export default App
