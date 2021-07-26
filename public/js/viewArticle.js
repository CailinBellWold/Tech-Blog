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

const cancelButtonHandler = async () => {
  document.location.replace('/viewArticle');
}

document
  .querySelector('.newCommentForm')
  .addEventListener('submit', newCommentFormHandler);

  document
  .querySelector('#btn-cancel')
  .addEventListener('reset', cancelButtonHandler);
