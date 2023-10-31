const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const progressBar = document.getElementById('progressBar');
const status = document.getElementById('status');

uploadBtn.addEventListener('click', () => {
    const file = fileInput.files[0];
  
    if (file) {
      uploadFile(file);
    } else {
      status.textContent = 'Файл не выбран';
    }
});

function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
  
    const xhr = new XMLHttpRequest();
  
    xhr.upload.addEventListener("progress", function(e) {
      const percentComplete = Math.round((e.loaded * 100) / e.total);
      progressBar.style.width = percentComplete + '%';
      progressBar.textContent = percentComplete + '%';
    });
  
    xhr.addEventListener('load', function() {
      if (xhr.status === 200) {
        status.textContent = 'Файл успешно загружен';
      } else {
        status.textContent = 'Ошибка при загрузке файла';
      }
      progressBar.style.width = '0%';
      progressBar.textContent = '';
    });
  
    xhr.open('POST', '/upload', true);
    xhr.send(formData);
  }