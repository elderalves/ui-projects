document.addEventListener('DOMContentLoaded', function(){
    var duration = 300;

    function svgClippedSlider(element) {
        this.element = element;
        this.slidesGallery = this.element.querySelector('.gallery').children;
        this.slidesCaption = this.element.querySelector('.caption').children;
        this.slidesNumber = this.slidesGallery.length;

        

        let liSelected = document.querySelector('.selected');
        this.selectedSlide = Array.prototype.slice.call(this.slidesGallery).indexOf(liSelected);
        
        this.arrowNext = this.element.querySelector('.navigation').querySelector('.next');
        this.arrowPrev = this.element.querySelector('.navigation').querySelector('.prev');

        this.visibleSlidePath = this.element.dataset.selected;
        this.lateralSlidePath = this.element.dataset.lateral;

        this.bindEvents();
    }

    svgClippedSlider.prototype.bindEvents = function() {
        var self = this;

        for(let i = 0; i < this.slidesGallery.length; i++) {
            this.slidesGallery[i].addEventListener('click', function(){
                if(!this.classList.contains('selected')) {
                var newSlideIndex = ( this.classList.contains('left') ) 
                                    ? self.showPrevSlide(self.selectedSlide - 1) 
                                    : self.showNextSlide(self.selectedSlide + 1);
                }
            });
        }
    }

    svgClippedSlider.prototype.showPrevSlide = function(index) {
        var self = this;
        this.selectedSlide = index;

        this.slidesGallery[index + 1].classList.remove('selected');
        this.slidesGallery[index + 1].classList.add('right');
        this.slidesCaption[index + 1].classList.remove('selected');
        this.slidesCaption[index + 1].classList.add('right');

        this.slidesGallery[index].classList.remove('left');
        this.slidesGallery[index].classList.add('selected');
        this.slidesCaption[index].classList.remove('left');
        this.slidesCaption[index].classList.add('selected');

        Snap("#cd-morphing-path-"+(index+1)).animate({'d': self.visibleSlidePath}, duration, mina.easeinout);
        Snap("#cd-morphing-path-"+(index+2)).animate({'d': self.lateralSlidePath}, duration, mina.easeinout);

        if(index - 1 >= 0) {
            this.slidesGallery[index - 1].classList.remove('left-hide');
            this.slidesGallery[index - 1].classList.add('left');
        }
        
        if(index + 2 < this.slidesNumber) {
            this.slidesGallery[index + 2].classList.remove('right');
            this.slidesCaption[index + 2].classList.remove('right');
        }

        (index <= 0) && this.element.classList.add('prev-hidden');
        this.element.classList.remove('next-hidden');

        this.arrowPrev.classList.add('active');

        function addListenerMulti(element, eventNames, listener) {
            var events = eventNames.split(' ');
            for(var i = 0, iLen = events.length; i < iLen; i++) {
                element.addEventListener(events[i], listener, false);
            }
        }

        addListenerMulti(this.arrowPrev, 'webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
            self.arrowPrev.classList.remove('active');
        });

    }
    
    svgClippedSlider.prototype.showNextSlide = function(index) {
        var self = this;
        this.selectedSlide = index;

        this.slidesGallery[index - 1].classList.remove('selected');
        this.slidesGallery[index - 1].classList.add('left');
        this.slidesCaption[index - 1].classList.remove('selected');
        this.slidesCaption[index - 1].classList.add('left');

        this.slidesGallery[index].classList.remove('right');
        this.slidesGallery[index].classList.add('selected');
        this.slidesCaption[index].classList.remove('right');
        this.slidesCaption[index].classList.add('selected');

        Snap("#cd-morphing-path-"+(index+1)).animate({'d': self.visibleSlidePath}, duration, mina.easeinout);
        Snap("#cd-morphing-path-"+(index)).animate({'d': self.lateralSlidePath}, duration, mina.easeinout);

        if(index - 2 >= 0) {
            this.slidesGallery[index - 2].classList.remove('left');
            this.slidesGallery[index - 2].classList.add('left-hide');
            this.slidesCaption[index - 2].classList.remove('left');
            this.slidesCaption[index - 2].classList.add('.left-hide');
        }

        if(index + 1 < this.slidesNumber) {
            this.slidesGallery[index + 1].classList.add('right');
            this.slidesCaption[index + 1].classList.add('right');
            
        }

        (index <= 0) && this.element.classList.add('next-hidden');
        this.element.classList.remove('prev-hidden');

        this.arrowNext.classList.add('active');

        function addListenerMulti(element, eventNames, listener) {
            var events = eventNames.split(' ');
            for(var i = 0, iLen = events.length; i < iLen; i++) {
                element.addEventListener(events[i], listener, false);
            }
        }

        addListenerMulti(this.arrowNext, 'webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
            self.arrowNext.classList.remove('active');
        });

    }

    clippedSlider = document.querySelectorAll('.cd-svg-clipped-slider');
    clippedSlider.forEach(function(element) {
        new svgClippedSlider(element);
    }, this);
});




