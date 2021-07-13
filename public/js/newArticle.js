const newArticleFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the /newArticle form
  const articleTitle = document.getElementById('new-Article-Title').value.trim();
  const articleContent = document.getElementById('new-Article-Content').value.trim();

  if (articleTitle && articleContent) {
    const response = await fetch('/api/article', {
      method: 'POST',
      body: JSON.stringify({ articleTitle, articleContent }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }

  const response = await fetch(`/api/article/${id}`, {
    method: 'POST',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to add article.');
  }
};

const cancelButtonHandler = async () => {
  document.location.replace('/dashboard');
}

document
  .querySelector('.newArticleForm')
  .addEventListener('submit', newArticleFormHandler);

  document
  .querySelector('#btn-cancel')
  .addEventListener('reset', cancelButtonHandler);
