export class SearchForm {
  constructor(searchFormRootTag) {
    this.observers = [];
    this.searchForm = searchFormRootTag;
    this.searchError = document.querySelector('.js-search-form__error');
    this.searchInput = document.querySelector('.js-search-form__input');
    this.searchForm.addEventListener('submit', this.handleSumbit.bind(this));
    this.searchInput.addEventListener('input', this.handleInput.bind(this));
  }

  handleSumbit(event) {
    event.preventDefault();
    let errorInForm = false;
    const formData = new FormData(this.searchForm);
    if (formData.get('search').length === 0) {
      this.searchError.textContent = 'Введите строку поиска';
      errorInForm = true;
    }

    if (errorInForm) {
      return;
    }

    this.observers.forEach((o) => o.handleEvent('search', formData.get('search')));
  }

  handleInput(event) {
    const isNameInputChange = event.target.classList.contains('js-search-form__input');
    if (isNameInputChange) {
      this.searchError.textContent = '';
    }
  }

  addObserver(o) {
    this.observers.push(o);
  }

  removeObserver(o) {
    this.observers = this.observers.filter((subscriber) => subscriber !== o);
  }
}
