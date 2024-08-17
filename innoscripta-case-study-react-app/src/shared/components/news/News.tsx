import { useEffect, useRef, useState } from 'react'
import { News } from '../../constants/types'
import {
  BoldSpan,
  DefaultSpan,
  LoaderWrapperCentered,
} from '../../styles/General.styled'
import eng from '../../translations/eng'
import CircularLoader from './loaders/CircularLoader'
import {
  FadedDivLeft,
  FadedDivRight,
  NavigationButtonsDiv,
  NewsWrapper,
  PreviousSpanWrapper,
  SingleNewsDiv,
  SingleNewsWrapper,
  SliderWrapper,
} from './News.styled'
import Progress from '../graphics/progress/Progress'
import DefaultButton from '../buttons/defaultButton/DefaultButton'

type NewsProps = {
  isLoading: boolean
  news: News[]
}

const News = ({ isLoading, news }: NewsProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const [currentNewsIndex, setCurrentNewsIndex] = useState<number>(0)
  const sliderRef = useRef(null)

  const onClickNext = () => {
    setCurrentNewsIndex((prev) => (prev < news.length - 1 ? prev + 1 : prev))
  }

  const onClickPrevious = () => {
    setCurrentNewsIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const onClickSpecificNews = (clickedIndex: number) => {
    setCurrentNewsIndex(clickedIndex)
  }

  const moveSlider = () => {
    if (!(sliderRef && sliderRef.current)) return

    const elem = sliderRef.current
    elem.style.right = `${currentNewsIndex * 100}%`
  }

  useEffect(() => {
    moveSlider()
  }, [currentNewsIndex])

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(!isLoading)
    }, 200)
  }, [isLoading])

  if (isLoading)
    return (
      <LoaderWrapperCentered>
        <CircularLoader loadingText={eng.components.news.loading} />
      </LoaderWrapperCentered>
    )

  return (
    <NewsWrapper isVisible={isVisible}>
      <FadedDivLeft />
      <FadedDivRight />
      <SliderWrapper ref={sliderRef}>
        {news.map((news: News, newsIndex: number) => {
          return (
            <SingleNewsWrapper key={newsIndex}>
              <SingleNewsDiv>
                <BoldSpan>{news.title}</BoldSpan>
                <DefaultSpan>{news.date.toLocaleDateString()}</DefaultSpan>
              </SingleNewsDiv>
            </SingleNewsWrapper>
          )
        })}
      </SliderWrapper>
      <Progress
        numberOfElements={news.length}
        selectedIndex={currentNewsIndex}
        onClick={onClickSpecificNews}
      />
      <NavigationButtonsDiv>
        <PreviousSpanWrapper isVisible={currentNewsIndex > 0}>
          <DefaultSpan
            cursor="pointer"
            fontSize="0.9em"
            onClick={onClickPrevious}
          >
            {eng.navigation.previous}
          </DefaultSpan>
        </PreviousSpanWrapper>
        <DefaultButton text={eng.navigation.next} onClick={onClickNext} />
      </NavigationButtonsDiv>
    </NewsWrapper>
  )
}

export default News
