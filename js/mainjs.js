class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10); // Use base 10 for parseInt
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Change text color dynamically
    const textColor = '#FF4500'; // Example color
    this.txtElement.innerHTML = `<span class="txt" style="color: ${textColor};">${this.txt}</span>`;

    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 300;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  new TypeWriter(txtElement, words, wait);
}


// Contact us and up-arrow button js

document.getElementById('mainIcon').addEventListener('click', function() {
  document.getElementById('hiddenIcons').classList.remove('hidden');
});

document.getElementById('cancelIcon').addEventListener('click', function() {
  document.getElementById('hiddenIcons').classList.add('hidden');
});

document.getElementById('scrollTopButton').addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


//target count js

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.counter');
  const duration = 1000; // Duration in milliseconds

  const countUp = (counter) => {
    const target = +counter.getAttribute('data-target');
    const increment = target / (duration / 10); // Calculate the increment based on duration
    let current = 80;

    const updateCount = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target + '+';
      }
    };
    updateCount();
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 1.0 });

  counters.forEach(counter => {
    observer.observe(counter);
  });
});

// scroll to form

function scrollToForm() {
  const enquiryForm = document.getElementById('enquiryForm');
  enquiryForm.scrollIntoView({ behavior: 'smooth' });
}

// view more  & view less

document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
      const contentElement = card.querySelector(".content");
      const toggleButton = card.querySelector(".toggleButton");
      const fullText = contentElement.innerText;
      const truncatedText = fullText.substring(0, 350);

      let isTruncated = true;

      function toggleContent() {
          if (isTruncated) {
              contentElement.innerText = fullText;
              toggleButton.innerText = "View Less";
          } else {
              contentElement.innerText = truncatedText + "...";
              toggleButton.innerText = "View More";
          }
          isTruncated = !isTruncated;
      }

      contentElement.innerText = truncatedText + "...";
      toggleButton.innerText = "View More";
      toggleButton.onclick = toggleContent;
  });
});