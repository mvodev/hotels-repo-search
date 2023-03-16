import { SearchForm } from '../search-form/search-form';

class SearchResult {
  constructor(searchWrapperRootTag) {
    this.searchResultRoot = searchWrapperRootTag;
    const searchFormRoot = document.querySelector('.js-search-form');
    this.searchForm = new SearchForm(searchFormRoot);
    this.searchForm.addObserver(this);
    this.spinner = document.querySelector('.js-search-result__loader');
    this.searchWrapper = document.querySelector('.js-search-result');
    this.searchList = document.querySelector('.js-search-result__list');
    this.curtain = document.querySelector('.js-search-result__curtain');
  }

  async handleEvent(message, data) {
    if (message === 'search') {
      this.curtain.classList.remove('search-result__curtain_disabled');
      this.spinner.classList.remove('search-result__loader_disabled');
      const queryString = `q=${encodeURIComponent(`${data} in:name`)}`;
      const request = await fetch(`https://api.github.com/search/repositories?${queryString}`);
      const result = await request.json();
      if (result.total_count === 0) {
        this.searchList.innerHTML = '<li><span>Ничего не найдено</span></li>';
      } else {
        this.searchList.innerHTML = '';
        const MAX_ELEMS_TO_SHOW = 10;
        const maxOfElements = result.total_count >= MAX_ELEMS_TO_SHOW
          ? MAX_ELEMS_TO_SHOW : result.total_count;
        for (let i = 0; i < maxOfElements; i += 1) {
          const li = document.createElement('li');
          li.classList.add('search-result__list-item');
          const a = document.createElement('a');
          a.title = 'Ссылка на репозиторий';
          a.href = result.items[i].url;
          a.textContent = `Название: ${result.items[i].name}`;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          const span = document.createElement('span');
          span.textContent = `Описание: ${result.items[i].description}`;
          li.appendChild(a);
          li.appendChild(span);
          this.searchList.appendChild(li);
        }
      }
      this.curtain.classList.add('search-result__curtain_disabled');
      this.spinner.classList.add('search-result__loader_disabled');
    }
  }
}

// eslint-disable-next-line no-unused-vars
const searchResult = new SearchResult(document.querySelector('.js-search-result'));
