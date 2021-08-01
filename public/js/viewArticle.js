const newCommentFormHandler = async (event) => {
  event.preventDefault();

  const article_id = document.getElementById('btn-comment').getAttribute('data-id');
  const content = document.getElementById('newCommentContent').value.trim();

  if (content) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ content, article_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

const updateButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'GET',
    });

    if (response.ok) {
      document.location.replace(`/updateComment/${id}`);
    } else {
      alert('You may only update your own comments.');
    }
  } else {
    alert('Update button did not have a data-id');
  }
};

const deleteButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('You may only delete your own comments.');
    }
  } else {
    alert('Delete button did not have a data-id');
  }
};

const cancelButtonHandler = async () => {
  document.location.replace('/viewArticle');
}

document
  .querySelector('.newCommentForm')
  .addEventListener('submit', newCommentFormHandler);

document
  .querySelector('#btn-cancel')
  .addEventListener('reset', cancelButtonHandler);

document
  .querySelectorAll('.btn-update')
  .forEach(btn => btn.addEventListener('click', updateButtonHandler));

document
  .querySelectorAll('.btn-delete')
  .forEach(btn => btn.addEventListener('click', deleteButtonHandler));
