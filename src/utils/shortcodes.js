const outdent = require('outdent')({
  newline: ' ',
});

module.exports = {
  email: function (text, key = false) {
    const downloadText = 'Download public key (ProtonMail/GPG)';
    const link = outdent`
    <a id="email" class="objuscated" href="mailto:hey (at) imhoff (dot) name">
      ${text}
    </a>`;
    const keyDownload = outdent`
    <span id="lock-box" class="about-lock-box hidden">
      <a
        title="${downloadText}"
        aria-label="${downloadText}"
        href="/downloads/publickey.hey@imhoff.name-9cb867d4ccd2c1d7d9fde82f4b649797f3e007a9.asc"
      >
        <svg class="about-lock-icon" aria-hidden="true" viewBox="0 0 24 24" width="1em" height="1em">
          <use xlink:href="#lock"></use>
        </svg>
      </a></span>`;

    return `${link} ${key ? keyDownload : ''}`;
  },
  map: function (mid) {
    return outdent`
    <iframe class="map" src="https://www.google.com/maps/d/u/0/embed?mid=${mid}" width="1000" height="500">
    </iframe>`;
  },
  youtube: function (id) {
    return outdent`
    <div class="video-wrapper">
      <iframe src="https://www.youtube.com/embed/${id}"
        frameborder="0" allowfullscreen
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
      </iframe>
    </div>`;
  },
};
