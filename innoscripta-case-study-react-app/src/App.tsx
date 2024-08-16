import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landingPage/LandingPage'
import ContentWrapper from './shared/layout/content/ContentWrapper'
import Header from './shared/layout/header/Header'
import { LANDING_PAGE_PATH } from './shared/constants/paths'

const App = () => {
  return (
    <>
      <Header />
      <ContentWrapper>
        <Routes>
          <Route path={LANDING_PAGE_PATH} element={<LandingPage />} />
          <Route path="/" element={<Navigate to={LANDING_PAGE_PATH} />} />
        </Routes>
      </ContentWrapper>
    </>
  )
}

export default App
