class VideoPlayer {
  constructor() {
    const player = document.querySelector('.player');

    this.video = player.querySelector('video');
    this.playButton = player.querySelector('.player__button.toggle');
    this.sliders = player.querySelectorAll('.player__slider');
    this.skips = player.querySelectorAll('[data-skip]');
    this.progressBar = player.querySelector('.progress');
    this.progressBarInner = player.querySelector('.progress .progress__filled');

    this.setupEvents();
  }

  get volume() {
    return this.video.volume;
  }

  set volume(value) {
    this.video.volume = parseFloat(value, 10);
  }

  get playbackRate() {
    return this.video.playbackRate;
  }

  set playbackRate(value) {
    this.video.playbackRate = parseFloat(value, 10);
  }

  get progress() {
    return ((this.video.currentTime / this.video.duration) * 100).toFixed(2);
  }

  set progress(value) {
    this.progressBarInner.style.flexBasis = `${this.progress}%`;
  }

  toggleIcon() {
    this.playButton.textContent = this.video.paused ? '►' : '❚ ❚';
  }

  togglePlay() {
    return this.video.paused ? this.video.play() : this.video.pause();
  }

  skip(value) {
    this.video.currentTime += parseFloat(value, 10);
  }

  scrub(e) {
    this.video.currentTime = (e.offsetX / this.progressBar.offsetWidth) * this.video.duration;
    this.progress = this.video.currentTime;
  }

  init() {
    this.progress = this.video.currentTime;
  }

  setupEvents() {
    // Init
    this.video.addEventListener('canplay', () => this.init());

    // Icon
    this.video.addEventListener('play', () => this.toggleIcon());
    this.video.addEventListener('pause', () => this.toggleIcon());

    // Progress
    this.video.addEventListener('timeupdate', () => {
      this.progress = this.video.currentTime;
    });

    // Scrub
    let mousedown = false;
    this.progressBar.addEventListener('click', (e) => this.scrub(e));
    this.progressBar.addEventListener('mousemove', (e) => mousedown && this.scrub(e));
    this.progressBar.addEventListener('mousedown', () => mousedown = true);
    this.progressBar.addEventListener('mouseup', () => mousedown = false);

    // Controls
    this.video.addEventListener('click', () => this.togglePlay());
    this.playButton.addEventListener('click', () => this.togglePlay());

    // Skips
    this.skips.forEach(skip => {
      skip.addEventListener('click', () => {
        this.skip(skip.dataset.skip);
      });
    });

    // Sliders
    this.sliders.forEach(slider => {
      let fn = () => this[slider.name] = slider.value;
      slider.addEventListener('mousemove', fn);
      slider.addEventListener('change', fn);
    });
  }
}

const player = new VideoPlayer();
