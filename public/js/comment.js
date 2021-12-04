const commentFormHandler = async (event) => {
  event.preventDefault();
  const description = document.querySelector('#description').value.trim();
  const post_id = document.querySelector('#post_id').value.trim();

  if (post_id && description) {

    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ post_id, description }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed add comment.');
    }
  }
};

document
  .querySelector('#create-new-comment')
  .addEventListener('submit', commentFormHandler);