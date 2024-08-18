import { useEffect, useRef, useState } from 'react'
import {
  BoldSpan,
  DefaultSpan,
  LoaderWrapperCentered,
} from '../../styles/General.styled'
import eng from '../../translations/eng'
import CircularLoader from '../loaders/circularLoader/CircularLoader'
import {
  FadedDivLeft,
  FadedDivRight,
  NavigationButtonsDiv,
  NewsWrapper,
  PreviousSpanWrapper,
  ArticleDiv,
  SingleNewsWrapper,
  SliderWrapper,
  ArticleHeaderDiv,
  VisibilityWrapper,
} from './NewsSlider.styled'
import Progress from '../graphics/progress/Progress'
import DefaultButton from '../buttons/defaultButton/DefaultButton'
import { Article, NewsAPIOrgResponse } from '../../constants/types'
import { redirectToUrl } from '../../constants/util'
import FilterBox from '../filterBox/FilterBox'

type NewsSliderProps = {
  isLoading: boolean
  news: NewsAPIOrgResponse
  showFilterBox: boolean
}

const NewsSlider = ({ isLoading, news, showFilterBox }: NewsSliderProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const [currentNewsIndex, setCurrentNewsIndex] = useState<number>(0)
  const sliderRef = useRef(null)

  const onClickNext = () => {
    setCurrentNewsIndex((prev) =>
      prev < news.articles.length ? prev + 1 : prev
    )
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

  const onClickSubscribe = () => {
    alert('Subscribe')
  }

  useEffect(() => {
    moveSlider()
  }, [currentNewsIndex])

  useEffect(() => {
    if (isLoading) {
      setCurrentNewsIndex(0)
      setIsVisible(false)
    } else {
      setTimeout(() => {
        setIsVisible(!isLoading)
      }, 200)
    }
  }, [isLoading])

  return (
    <NewsWrapper>
      <FadedDivLeft />
      <FadedDivRight />
      <FilterBox isVisible={showFilterBox} />
      {isLoading ? (
        <LoaderWrapperCentered>
          <CircularLoader loadingText={eng.components.news.loading} />
        </LoaderWrapperCentered>
      ) : (
        <>
          <SliderWrapper ref={sliderRef} isVisible={isVisible}>
            {news?.articles?.map((article: Article, articleIndex: number) => {
              return (
                <SingleNewsWrapper key={articleIndex}>
                  <ArticleDiv>
                    <ArticleHeaderDiv>
                      <BoldSpan>{article.title}</BoldSpan>
                      <DefaultSpan fontSize="0.9em">
                        {`${article.source.name} - ${new Date(article.publishedAt).toLocaleDateString()}`}
                      </DefaultSpan>
                    </ArticleHeaderDiv>
                    <DefaultButton
                      text={eng.components.news.view_full_article(
                        article.source.name
                      )}
                      onClick={() => redirectToUrl(article.url)}
                      fontSize="0.9em"
                    />
                  </ArticleDiv>
                </SingleNewsWrapper>
              )
            })}
            <SingleNewsWrapper key="subscription">
              <ArticleDiv>
                <BoldSpan>{eng.components.news.max_news}</BoldSpan>
                <DefaultButton
                  text={eng.components.news.subscribe}
                  onClick={onClickSubscribe}
                />
              </ArticleDiv>
            </SingleNewsWrapper>
          </SliderWrapper>
          {news && (
            <VisibilityWrapper isVisible={isVisible}>
              <Progress
                numberOfElements={news.articles?.length + 1}
                selectedIndex={currentNewsIndex}
                onClick={onClickSpecificNews}
              />
            </VisibilityWrapper>
          )}
          <NavigationButtonsDiv isVisible={isVisible}>
            <PreviousSpanWrapper isDisabled={currentNewsIndex === 0}>
              <DefaultSpan fontSize="0.9em" onClick={onClickPrevious}>
                {eng.navigation.previous}
              </DefaultSpan>
            </PreviousSpanWrapper>
            <DefaultButton
              text={eng.navigation.next}
              onClick={onClickNext}
              isDisabled={currentNewsIndex === news?.articles?.length}
            />
          </NavigationButtonsDiv>
        </>
      )}
    </NewsWrapper>
  )
}

export default NewsSlider
