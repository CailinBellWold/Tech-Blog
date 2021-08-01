const updateCommentFormHandler = async (event) => {
  event.preventDefault();

  const id = document.getElementById('btn-save').getAttribute('data-id');
  const commentContent = document.getElementById('commentContent').value.trim();

  if (id) {
    const response = await fetch(`/api/comments/updateComment/${id}`, {
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
  }
};

const cancelButtonHandler = async () => {
  console.log('CancelBtn');
  document.location.replace('/');
}

document
  .querySelector('.updateCommentForm')
  .addEventListener('submit', updateCommentFormHandler);

document
  .querySelector('.updateCommentForm')
  .addEventListener('reset', cancelButtonHandler);
