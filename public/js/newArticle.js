const newArticleHandler = async (event) => {
  event.preventDefault();
  // Collect values from the /newArticle form
  const articleTitle = document.getElementById('articleTitle').value.trim();
  const articleContent = document.getElementById('articleContent').value.trim();

  if (articleTitle && articleContent) {
    const response = await fetch('/api/article', {
      method: 'POST',
      body: JSON.stringify({ articleTitle, articleContent }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace('/userlanding');
    } else {
      alert(response.statusText);
    }
  }

  const response = await fetch(`/api/article/${id}`, {
    method: 'POST',
  });

  if (response.ok) {
    document.location.replace('/userlanding');
  } else {
    alert('Failed to add article.');
  }
};

const cancelButtonHandler = async () => {
  document.location.replace('/userlanding');
}

document
  .querySelector('.newArticleForm')
  .addEventListener('submit', newArticleHandler);

  document
  .querySelector('#btn-cancel')
  .addEventListener('reset', cancelButtonHandler);
