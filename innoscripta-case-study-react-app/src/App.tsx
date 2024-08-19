import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landingPage/LandingPage'
import ContentWrapper from './shared/layout/content/ContentWrapper'
import Header from './shared/layout/header/Header'
import { HOME_PATH, LANDING_PAGE_PATH } from './shared/constants/paths'
import Homepage from './pages/homepage/Homepage'
import { Provider } from 'react-redux'
import store, { persistor } from './shared/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { useState } from 'react'
import Toast, {
  ToastContext,
  ToastProps,
  ToastType,
} from './shared/components/toast/Toast'

const App = () => {
  const [toastProps, setToastProps] = useState<ToastProps>({
    type: ToastType.Information,
    message: '',
    customKey: 0,
    delaySeconds: null,
    hide: true,
  })

  const hideToast = () => {
    setToastProps((prev) => {
      return {
        ...prev,
        hide: true,
      }
    })
  }

  const showToast = (
    type: ToastType,
    message: string,
    delaySeconds?: number
  ) => {
    setToastProps((prev) => {
      return {
        type,
        message,
        customKey: prev.customKey + 1,
        delaySeconds: delaySeconds,
        hide: false,
      }
    })
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toast {...toastProps} />
        <ToastContext.Provider value={{ show: showToast, hide: hideToast }}>
          <Header />
          <ContentWrapper>
            <Routes>
              <Route path={LANDING_PAGE_PATH} element={<LandingPage />} />
              <Route path={HOME_PATH} element={<Homepage />} />
              <Route path="/" element={<Navigate to={LANDING_PAGE_PATH} />} />
              <Route path="/*" element={<Navigate to={LANDING_PAGE_PATH} />} />
            </Routes>
          </ContentWrapper>
        </ToastContext.Provider>
      </PersistGate>
    </Provider>
  )
}

export default App
