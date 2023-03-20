/* -----------------------------------------
   PAGINATION - /src/js/cagov/pagination.js
----------------------------------------- */

function pageListItem(label, number) {
 return `<li class="cagov-pagination__item">
    <a
      href="javascript:void(0);"
      class="cagov-pagination__button"
      aria-label="${label} ${number}"
      data-page-num="${number}"
    >
      ${number}
    </a>
  </li>`;
}

function pageOverflow() {
 return `<li
    class="cagov-pagination__item cagov-pagination__overflow"
    role="presentation"
  >
    <span> … </span>
  </li>`;
}

function templateHTML(next, previous, page, currentPage, totalPages) {
 var unbounded = (totalPages == -1);
 return `<nav aria-label="Pagination" class="cagov-pagination">
    <ul class="cagov-pagination__list">
      <li class="cagov-pagination__item">
        <a
          href="javascript:void(0);"
          class="cagov-pagination__link cagov-pagination__previous-page"
          aria-label="previous page"
        >
          <span class="cagov-pagination__link-text ${currentPage > 1 ? '' : 'cagov-pagination__link-inactive'
  }"> ${previous} </span>
        </a>
      </li>
      ${currentPage > 2 ? pageListItem(page, 1) : ''}

      ${currentPage == 4 ? pageListItem(page, 2) : ''}
      ${currentPage > 4 ? pageOverflow() : ''}

      ${currentPage > 1 ? pageListItem(page, currentPage - 1) : ''}

      <li class="cagov-pagination__item cagov-pagination-current">
        <a
          href="javascript:void(0);"
          class="cagov-pagination__button"
          aria-label="Page ${currentPage}"
          aria-current="page"
          data-page-num="${currentPage}"
        >
          ${currentPage}
        </a>
      </li>

      ${unbounded || (currentPage < totalPages) ? pageListItem(page, currentPage + 1) : ''}

      ${!unbounded && (currentPage < totalPages - 2) ? pageOverflow() : ''}
      ${unbounded ? pageListItem(page, currentPage + 2) : ''}

      ${currentPage < totalPages - 1 ? pageListItem(page, totalPages) : ''}
      ${unbounded ? pageOverflow() : ''}

      <li class="cagov-pagination__item">
        <a
          href="javascript:void(0);"
          class="cagov-pagination__link cagov-pagination__next-page"
          aria-label="next page"
        >
          <span class="cagov-pagination__link-text ${!unbounded && (currentPage > totalPages - 1)
   ? 'cagov-pagination__link-inactive'
   : ''
  }"> ${next} </span>
        </a>
      </li>
    </ul>
  </nav>`;
}

var styles =
 `
cagov-pagination {
  white-space: nowrap;
  font-size: .9rem;
}
cagov-pagination a {
  text-decoration: none !important;
}
cagov-pagination .cagov-pagination__list {
  list-style: none;
  margin: 0;
  padding: 0 !important;
  display: flex;
}
cagov-pagination .cagov-pagination__item {
  margin: var(--s-sm, 0.25rem);
}
cagov-pagination .cagov-pagination__item a {
  padding: 6px 14px;
  display: inline-block;
  color: #4a4958;
}
cagov-pagination .cagov-pagination__item a:hover, cagov-pagination .cagov-pagination__item a:focus {
  box-shadow: inset 0 0 0 3px #d4d4d7;
}
cagov-pagination .cagov-pagination__item.cagov-pagination-current {
 font-weight:700;
}
cagov-pagination .cagov-pagination__item.cagov-pagination-current a {
  box-shadow: inset 0 0 0 1px #d4d4d7;
}
cagov-pagination .cagov-pagination__item.cagov-pagination__overflow {
  border: none;
  padding: 0.875rem 0;
}
cagov-pagination .cagov-pagination__item:has(.cagov-pagination__link-inactive) {
  display:none;
}
.ca-gov-icon-arrow-prev, .ca-gov-icon-arrow-next {
  font-size: 0.86em;
}
`;

/**
 * Pagination web component
 *
 * @element cagov-pagination
 *
 * @fires paginationClick - custom event with object with detail value of current page: {detail: 1}
 *
 * @attr {string} [data-yes] - "Yes";
 * @attr {string} [data-no] - "No";
 *
 * @cssprop --primary-700 - Default value of #165ac2, used for text, border color
 */
class CAGovPagination extends window.HTMLElement {
 constructor() {
  super();

  if (!document.querySelector('#cagov-pagination-styles')) {
   const style = document.createElement('style');
   style.id = 'cagov-pagination-styles';
   style.textContent = styles;
   document.querySelector('head').appendChild(style);
  }
 }

 connectedCallback() {
  this.currentPage = parseInt(
   this.dataset.currentPage ? this.dataset.currentPage : '1',
   10,
  );
  this.render();
 }

 render() {
  //console.log(this.dataset);
  const previous = this.dataset.previous ? this.dataset.previous : '<span class="ca-gov-icon-arrow-prev" aria-hidden="true"></span> Previous';
  const next = this.dataset.next ? this.dataset.next : 'Next <span class="ca-gov-icon-arrow-next" aria-hidden="true"></span>';
  const page = this.dataset.page ? this.dataset.page : 'Page';
  this.totalPages = this.dataset.totalPages ? this.dataset.totalPages : '1';
  if (this.totalPages < 0 || this.totalPages > 1) {
   const html = templateHTML(
    next,
    previous,
    page,
    this.currentPage,
    this.totalPages,
   );
   this.innerHTML = html;
   this.applyListeners();
  } else {
   this.innerHTML = "";
  }
 }

 static get observedAttributes() {
  return ['data-current-page', 'data-total-pages'];
 }

 attributeChangedCallback(name, oldValue, newValue) {
  if (name === 'data-current-page') {
   this.currentPage = parseInt(newValue, 10);
   this.render();
  }
  if (name === 'data-total-pages') {
   this.totalPages = parseInt(newValue, 10);
   this.render();
  }
 }

 applyListeners() {
  const pageLinks = this.querySelectorAll('.cagov-pagination__button');
  pageLinks.forEach((pl) => {
   pl.addEventListener('click', (event) => {
    this.currentPage = parseInt(event.target.dataset.pageNum, 10);
    this.dispatchEvent(
     new CustomEvent('paginationClick', {
      detail: this.currentPage,
     }),
    );
    this.dataset.currentPage = this.currentPage;
   });
  });
  this.querySelector('.cagov-pagination__previous-page').addEventListener(
   'click',
   (event) => {
    if (
     !event.target.classList.contains('cagov-pagination__link-inactive')
    ) {
     this.currentPage -= 1;
     if (this.currentPage < 1) {
      this.currentPage = 1;
     }
     this.dispatchEvent(
      new CustomEvent('paginationClick', {
       detail: this.currentPage,
      }),
     );
     this.dataset.currentPage = this.currentPage;
    }
   },
  );
  this.querySelector('.cagov-pagination__next-page').addEventListener(
   'click',
   (event) => {
    if (
     !event.target.classList.contains('cagov-pagination__link-inactive')
    ) {
     this.currentPage += 1;
     if ((this.totalPages != -1) && (this.currentPage > this.totalPages)) {
      this.currentPage = this.totalPages;
     }
     this.dispatchEvent(
      new CustomEvent('paginationClick', {
       detail: this.currentPage,
      }),
     );
     this.dataset.currentPage = this.currentPage;
    }
   },
  );
 }
}

window.customElements.define('cagov-pagination', CAGovPagination);

//export { CAGovPagination };
