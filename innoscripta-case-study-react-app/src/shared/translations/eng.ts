const eng = {
  pages: {
    landing_page: {
      welcome: 'Welcome to Innoscripta News',
      select_country: 'Please, select your country:',
    },
    homepage: {
      from_partners: 'From our partners:',
    },
  },
  components: {
    news: {
      loading: 'Loading news...',
      max_news: `You have reached the maximum number of news. Subscribe to our plan to get access to unlimited number of news!`,
      subscribe: 'Subscribe',
      view_full_article: (sourceName: string) =>
        `View full article on ${sourceName}'s website`,
    },
    filter_box: {
      header: 'Filters',
      sort_by: 'Sort by',
    },
    multi_select: {
      no_results: 'No results',
    },
  },
  navigation: {
    next: 'Next',
    previous: 'Previous',
  },
}

export default eng
