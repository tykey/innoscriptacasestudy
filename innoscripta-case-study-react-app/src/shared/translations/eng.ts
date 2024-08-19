const eng = {
  pages: {
    landing_page: {
      welcome: 'Welcome to Innoscripta News',
      username_placeholder: 'Insert username',
      enter: (username: string) => `Continue as ${username}`,
      continue_no_user: 'Or continue anonymously',
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
      no_articles: 'No articles seem to match your search...',
      reset_filters: 'Reset filters',
    },
    filter_box: {
      header: 'Filters',
      sort_by: 'Sort by',
      category: 'Category',
      sources: 'Sources',
      all_categories: 'All',
      all_sources: 'All',
      apply: 'Apply',
      no_filters: 'No filters available for this section',
      save: 'Save preferences',
      save_success: 'Filter preferences saved successfully',
    },
    multi_select: {
      no_results: 'No results',
    },
    multi_select_multiple: {
      add_option: 'Add',
    },
    header: {
      logged_in_as: (username: string) => `Logged in as ${username}`,
      not_logged_in: 'Login',
    },
  },
  navigation: {
    next: 'Next',
    previous: 'Previous',
  },
}

export default eng
