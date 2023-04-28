module.exports = {
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation() {
    return {
      t: (str) => str,
      i18n: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
};
