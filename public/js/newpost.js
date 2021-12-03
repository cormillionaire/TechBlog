//when click new post, 
//new posts
const newPostFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const description = document.querySelector('#description').value.trim();

  if (name && description) {
    const response = await fetch('/api/blogposts', {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Please fill out all fields');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPostFormHandler);
