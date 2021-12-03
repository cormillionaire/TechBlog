const makeNewComment = async (event) => {
  event.preventDefault();
  document.location.replace('/comments/'+event.target.id);
};

document
  .querySelector('.comments')
  .addEventListener('click', makeNewComment);