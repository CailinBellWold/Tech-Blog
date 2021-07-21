const updateArticleFormHandler = async (event) => {
  event.preventDefault();
  // const url = window.location.href;
  const id = request.params.id;
  const articleTitle = document.getElementById('articleTitle').value.trim();
  const articleContent = document.getElementById('articleContent').value.trim();
  // const articleComment = document.

  if (articleTitle && articleContent) {
    const response = await fetch(`/api/article/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ articleTitle, articleContent }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update article.');
    }
  }
};

const commentButtonHandler = async () => {
  document.location.replace('/comment');
}

document
  .querySelector('.updateArticleForm')
  .addEventListener('submit', updateArticleFormHandler);

  document
  .querySelector('#btn-comment')
  .addEventListener('submit', commentButtonHandler);
