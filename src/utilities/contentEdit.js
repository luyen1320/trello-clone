export const saveContentAfterPressEnter = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    e.target.Blur();
  }
};

export const selectAllInlineText = (e) => {
  e.target.focus();
  e.target.select();
  // document.exeCommand("selectAll", false, null);
};
