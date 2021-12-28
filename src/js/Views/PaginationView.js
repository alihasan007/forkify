import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEL = document.querySelector('.pagination');
  // publisher-subscriber pattern
  addHandlerClick(handler) {
    this._parentEL.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    // at page 1
    if (currentPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }
    // last page
    if (currentPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
       </svg>
       <span>Page ${currentPage - 1}</span>
    </button>
      `;
    }
    // other page
    if (currentPage < numPages) {
      return `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
       </svg>
       <span>Page ${currentPage - 1}</span>
    </button>
    <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
    <span>Page ${currentPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
    </button> 
    `;
    }
    // at page 1 no next page
    return '';
  }
}
export default new PaginationView();
