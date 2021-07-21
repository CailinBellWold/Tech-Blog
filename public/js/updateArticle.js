const updateArticleFormHandler = async (event) => {
  event.preventDefault();

  const id = document.getElementById('btn-save').getAttribute('data-id');
  const articleTitle = document.getElementById('articleTitle').value.trim();
  const articleContent = document.getElementById('articleContent').value.trim();

  // console.log ("BTN SAVE", document.querySelector('#btn-save').getAttribute('data-id')); //WORKS
  // console.log('Article Title from upd article FH', articleTitle); //WORKS
  // console.log('Article Content from upd article FH', articleContent); //WORKS
  // console.log('Data ID attribute', event.target.getAttribute('data-id')); //Doesn't work
  
  if (id) {
    const response = await fetch(`/api/articles/${id}`, {
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
  .querySelector('#btn-cancel')
  .addEventListener('reset', cancelButtonHandler);
