const makeNewPost = async (event) => {
  event.preventDefault();
  document.location.replace('/newpost');
};

const updatePost = async (event) => {
  event.preventDefault();
  document.location.replace('/updatepost/'+event.target.id);
};

document
  .querySelector('#new-post')
  .addEventListener('click', makeNewPost);

  const postHeader = document.querySelectorAll('.comments');
  const applyLink = () => {
    for (let i = 0; i < postHeader.length; i++) {
      postHeader[i].addEventListener('click', updatePost);
    }
  }
  
  applyLink();

