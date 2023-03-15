// import * as dotenv from 'dotenv';
/// import { Octokit } from 'octokit';
import { SearchForm } from '../search-form/search-form';

class SearchResult {
  constructor(searchWrapperRootTag) {
    this.searchResultRoot = searchWrapperRootTag;
    const searchFormRoot = document.querySelector('.js-search-form');
    this.searchForm = new SearchForm(searchFormRoot);
    this.searchForm.addObserver(this);
    // dotenv.config();
  }

  // eslint-disable-next-line class-methods-use-this
  async handleEvent(message, data) {
    if (message === 'search') {
      const queryString = `q=${encodeURIComponent(`${data} in:name`)}`;
      const request = await fetch(`https://api.github.com/search/repositories?${queryString}`);
      const result = await request.json();
      const fragment = document.createDocumentFragment();
      const ul = document.createElement('ul');
      ul.classList.add('search-result__list');
      if (result.total_count === 0) {
        ul.textContent = 'Ничего не найдено';
      } else {
        this.searchResultRoot.textContent = '';
        const MAX_ELEMS_TO_SHOW = 10;
        const maxOfElements = result.total_count >= MAX_ELEMS_TO_SHOW
          ? MAX_ELEMS_TO_SHOW : result.total_count;
        for (let i = 0; i < maxOfElements; i += 1) {
          const li = document.createElement('li');
          li.classList.add('search-result__list-item');
          const a = document.createElement('a');
          a.title = 'Ссылка';
          a.href = result.items[i].url;
          a.textContent = `Название: ${result.items[i].name}`;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          const span = document.createElement('span');
          span.textContent = `Описание: ${result.items[i].description}`;
          li.appendChild(a);
          li.appendChild(span);
          ul.appendChild(li);
          console.log(result.items[i]);
        }
      }
      fragment.appendChild(ul);
      this.searchResultRoot.appendChild(fragment);
    }
  }
}

// eslint-disable-next-line no-unused-vars
const searchResult = new SearchResult(document.querySelector('.js-search-result'));
