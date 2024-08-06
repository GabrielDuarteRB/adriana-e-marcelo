function criandoNossaHistoria() {
    fetch('../nossa-historia.json')
    .then(response => response.json())
    .then(data => {
      const timeline = document.getElementById('timeline');

      data.forEach(item => {
        const li = document.createElement('li');
        if (item.inverted) {
          li.classList.add('timeline-inverted');
        }

        const timelineImage = document.createElement('div');
        timelineImage.classList.add('timeline-image');
        timelineImage.style.backgroundImage = `url(${item.image})`;

        const timelinePanel = document.createElement('div');
        timelinePanel.classList.add('timeline-panel');

        const timelineHeading = document.createElement('div');
        timelineHeading.classList.add('timeline-heading');
        const h3 = document.createElement('h3');
        h3.innerText = item.heading;
        const span = document.createElement('span');
        span.innerText = item.date;
        timelineHeading.appendChild(h3);
        timelineHeading.appendChild(span);

        const timelineBody = document.createElement('div');
        timelineBody.classList.add('timeline-body');
        const p = document.createElement('p');
        p.innerText = item.body;
        timelineBody.appendChild(p);

        timelinePanel.appendChild(timelineHeading);
        timelinePanel.appendChild(timelineBody);

        li.appendChild(timelineImage);
        li.appendChild(timelinePanel);

        timeline.appendChild(li);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

criandoNossaHistoria()
