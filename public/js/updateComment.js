const updateCommentFormHandler = async (event) => {
  event.preventDefault();

  const id = document.getElementById('btn-save').getAttribute('data-id');
  const commentContent = document.getElementById('commentContent').value.trim();

  if (id && commentContent) {
    const response = await fetch(`/api/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ commentContent }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      console.log(err);
      alert('Failed to update article.');
    }
  } else {
  alert('Content field may not be blank.')
  }
};

// FUTURE DEV: Redirect to the viewArticle page that the comment originated from.
const cancelButtonHandler = async () => {
  // document.location.replace('/');
  // window.history.go(-1);
  window.history.back();
}

document
  .querySelector('.updateCommentForm')
  .addEventListener('submit', updateCommentFormHandler);

document
  .querySelector('.updateCommentForm')
  .addEventListener('reset', cancelButtonHandler);
