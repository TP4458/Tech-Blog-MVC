const newFormHandler = async (event) => {
  event.preventDefault();
  const comment = document.querySelector('#post-desc').value;
  const postId = document.querySelector('#post_id').textContent;
  if (comment) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ commentBody: comment, postId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }
};
document
  .querySelector('.new-psot-form')
  .addEventListener('submit', newFormHandler);
