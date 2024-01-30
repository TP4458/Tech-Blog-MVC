const commentFormHandler = async (event) => {
  event.preventDefault();
  const commentBody = document
    .querySelector(`textarea[name="comment-desc"]`)
    .value.trim();
  console.log(commentBody);
  const postId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  console.log(postId);

  if (commentBody) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ commentBody, postId }),
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
  .querySelector('.new-post-form')
  .addEventListener('submit', commentFormHandler);
