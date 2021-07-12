const newFormHandler = async (event) => {
  event.preventDefault();
  const url = window.location.href;
  // https://stackoverflow.com/questions/3730359/get-id-from-url-with-jquery
  const id = url.substring(url.lastIndexOf('/') + 1);
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
      document.location.replace('/userlanding');
    } else {
      alert('Failed to update article.');
    }
  }
};

const cancelButtonHandler = async () => {
  document.location.replace('/userlanding');
}

document
  .querySelector('.update-Article-Form')
  .addEventListener('submit', newFormHandler);

  document
  .querySelector('#btn-cancel')
  .addEventListener('reset', cancelButtonHandler);
