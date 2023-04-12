class Tabs {
  constructor(selector, options) {
    const defaultOptions = {
      isChanged: () => {},
      line: true,
    };

    this.options = {
      ...defaultOptions,
      ...options,
    };

    this.selector = selector;
    this.tabs = document.querySelector(`[data-tabs="${selector}"]`);

    if (this.tabs) {
      this.tabList = this.tabs.querySelector('.tabs__nav');
      this.tabsBtns = this.tabList.querySelectorAll('.tabs__nav > li > button');
      this.tabsContent = this.tabs.querySelector('.tabs__content');
      this.tabsPanels = [...this.tabsContent.children];
      this.tabsLine = this.tabs.querySelector('.tabs__line') || null;
    } else {
      console.error('Selector data-tabs doesn`t exist!');
      return;
    }

    this.check();
    this.init();
    this.events();
  }

  check() {
    if (
      document.querySelectorAll(`[data-tabs="${this.selector}"]`).length > 1
    ) {
      console.error('Number of items with the same DATA TABS more than one!');
      return;
    }

    if (this.tabsBtns.length !== this.tabsPanels.length) {
      console.error('The number of buttons and tab elements does not match!');
    }
  }

  init() {
    this.tabList.setAttribute('role', 'tablist');

    this.tabsBtns.forEach((el, i) => {
      el.setAttribute('type', 'button');
      el.setAttribute('role', 'tab');
      el.setAttribute('tabindex', '-1');
      el.setAttribute('id', `${this.selector}-${i + 1}`);
      el.classList.remove('_active');
    });

    this.tabsPanels.forEach((el, i) => {
      el.setAttribute('role', 'tabpanel');
      el.setAttribute('tabindex', '-1');
      el.setAttribute('aria-labelledby', this.tabsBtns[i].id);
      el.classList.remove('_active');
    });

    const firstBtn = this.tabsBtns[0];
    const firstPanel = this.tabsPanels[0];

    firstBtn.classList.add('_active');
    firstBtn.removeAttribute('tabindex');
    firstBtn.setAttribute('aria-selected', 'true');
    firstPanel.classList.add('_active');

    if (this.tabsLine) {
      setTimeout(() => {
        this.setTabsLine(firstBtn);
      }, 300);
    }
  }

  events() {
    this.tabsBtns.forEach((el, i) => {
      el.addEventListener('click', e => {
        const currentTab = this.tabList.querySelector('[aria-selected]');

        if (e.currentTarget !== currentTab) {
          this.switchTabs(e.currentTarget, currentTab);
        }
      });

      el.addEventListener('keydown', e => {
        const index = Array.prototype.indexOf.call(
          this.tabsBtns,
          e.currentTarget
        );

        let dir = null;

        if (e.which === 37) {
          dir = index - 1;
        } else if (e.which === 39) {
          dir = index + 1;
        } else if (e.which === 40) {
          dir = 'down';
        } else {
          dir = null;
        }

        if (dir !== null) {
          if (dir === 'down') {
            this.tabsPanels[i].focus();
          } else if (this.tabsBtns[dir]) {
            this.switchTabs(this.tabsBtns[dir], e.currentTarget);
          }
        }
      });
    });
  }

  switchTabs(newTab, oldTab = this.tabs.querySelector('[aria-selected]')) {
    if (this.tabsLine) {
      this.setTabsLine(newTab);
    }

    newTab.focus();

    newTab.removeAttribute('tabindex');
    newTab.setAttribute('aria-selected', 'true');

    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1');

    const index = Array.prototype.indexOf.call(this.tabsBtns, newTab);
    const oldIndex = Array.prototype.indexOf.call(this.tabsBtns, oldTab);

    this.tabsPanels[oldIndex].classList.remove('_active');
    this.tabsPanels[index].classList.add('_active');

    this.tabsBtns[oldIndex].classList.remove('_active');
    this.tabsBtns[index].classList.add('_active');

    this.options.isChanged(this);
  }

  setTabsLine(currentTab) {
    const tabsLeft = this.tabs.getBoundingClientRect().left;

    const { left, width } = currentTab.getBoundingClientRect();
    const lineLeft = left - tabsLeft;

    this.tabsLine.style.width = `${width}px`;
    this.tabsLine.style.left = `${lineLeft}px`;
  }
}

export default Tabs;
