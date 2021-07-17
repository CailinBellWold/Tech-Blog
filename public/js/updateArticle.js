const updateArticleFormHandler = async (event) => {
  event.preventDefault();
  const url = window.location.href;
  // https://stackoverflow.com/questions/3730359/get-id-from-url-with-jquery
  const id = url.substring(url.lastIndexOf('/') + 1);
  //request.params.id

  const articleTitle = document.getElementById('articleTitle').value.trim();
  const articleContent = document.getElementById('articleContent').value.trim();

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

const cancelButtonHandler = async () => {
  document.location.replace('/dashboard');
}

document
  .querySelector('.updateArticleForm')
  .addEventListener('submit', updateArticleFormHandler);

  document
  .querySelector('#btn-cancel')
  .addEventListener('reset', cancelButtonHandler);
