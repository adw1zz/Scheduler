
const textarea = document.querySelector('textarea');
const datetimeinput = document.getElementById('input-datetime');

datetimeinput.addEventListener('onchange', checkInput);

function checkInput(){
    if (!datetimeinput.textContent){
      alert('choose date and time!')
    }
}

textarea.addEventListener( 'input', autosize );
             
function autosize(){
  this.style.height = 'auto';
  let applyNow = this.style.offsetHeight;
  this.style.height = this.scrollHeight - 20 + 'px';
}


