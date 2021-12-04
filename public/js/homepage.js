const makeNewComment = async (event) => {
  event.preventDefault();
  document.location.replace('/comments/' + event.target.id);
};

const postHeader = document.querySelectorAll('.comments');

const applyLink = () => {
  for (let i = 0; i < postHeader.length; i++) {
    postHeader[i].addEventListener('click', makeNewComment);
  }
}

applyLink();
