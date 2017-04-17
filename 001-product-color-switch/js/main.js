document.addEventListener('DOMContentLoaded', function(){

  const colorsInput = document.querySelectorAll('.color-choose input');
  colorsInput.forEach(function(item){
    item.addEventListener('click', function(el){
      let color = this.dataset.image;
      let activeElem = document.querySelector('.active');
      activeElem.classList.remove('active');
      document.querySelector('.left-column img[data-image= ' + color + ']').classList.add('active');
      this.classList.add('active');
    })
  });

});
