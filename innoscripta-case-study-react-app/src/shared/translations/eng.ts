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
      categories: 'Categories',
      all_categories: 'All',
    },
    multi_select: {
      no_results: 'No results',
    },
    multi_select_multiple: {
      add_option: 'Add',
    },
  },
  navigation: {
    next: 'Next',
    previous: 'Previous',
  },
}

export default eng
