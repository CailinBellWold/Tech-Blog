const updateArticleFormHandler = async (event) => {
  event.preventDefault();

  const id = document.getElementById('btn-save').getAttribute('data-id');
  const articleTitle = document.getElementById('articleTitle').value.trim();
  const articleContent = document.getElementById('articleContent').value.trim();

  if (id) {
    const response = await fetch(`/api/articles/updateArticle/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ articleTitle, articleContent }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log(err);
      alert('Failed to update article.');
    }
  }
};

const cancelButtonHandler = async () => {
  console.log('CancelBtn');
  document.location.replace('/dashboard');
}

document
  .querySelector('.updateArticleForm')
  .addEventListener('submit', updateArticleFormHandler);

document
  .querySelector('.updateArticleForm')
  .addEventListener('reset', cancelButtonHandler);
