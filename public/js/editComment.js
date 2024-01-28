async function editFormHandler(event) {
  event.preventDefault();
  const commentBody = document.querySelector('#comment').value;
  const response = await fetch(`/api/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      commentBody,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    document.location.replace('//homepage');
  } else {
    alert(response.statusText);
  }
}

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }
  }
};

document
  .querySelector('.edit-comment-form')
  .addEventListener('submit', editFormHandler);

document
  .querySelector('#delete-comment')
  .addEventListener('click', delButtonHandler);
