const deletePost = async (event) => {
  const id = document.querySelector('#delete-post').value.trim();

  if (id) {
    const response = await fetch('/api/blogposts/'+id, {
      method: 'DELETE',
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete.');
    }
  }
};

const updatePost = async (event) => {
  const name = document.querySelector('#name').value.trim();
  const description = document.querySelector('#description').value.trim();
  const id = document.querySelector('#post_id').value.trim();

  if (name && description) {
    const response = await fetch('/api/blogposts/'+id, {
      method: 'PUT',
      body: JSON.stringify({ name, description}),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update.');
    }
  }
};

document
  .querySelector('#delete-post')
  .addEventListener('click', deletePost);

  document
  .querySelector('.update-post-form')
  .addEventListener('submit', updatePost);


