const addButtonHandler = async (event) => {
  document.location.replace('/newArticle');
};

const updateButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    document.location.replace(`/api/article/${id}`);
  } else {
    alert('Update button did not have a data-id');
  }
};

const deleteButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/article/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/userlanding');
    } else {
      alert('Failed to delete article');
    }
  } else {
    alert('Delete button did not have a data-id');
  }
};

document
  .querySelector('#btn-add')
  .addEventListener('click', addButtonHandler);

document
  .querySelectorAll('.btn-update')
  .forEach(btn => btn.addEventListener('click', updateButtonHandler));

document
  .querySelectorAll('.btn-delete')
  .forEach(btn => btn.addEventListener('click', deleteButtonHandler));
