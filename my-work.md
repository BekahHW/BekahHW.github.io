---
layout: two-column
title: "Connecting Devs, Docs, & DX: My Work"
featured_image: /assets/images/pages/BHW_speaker.jpeg
---

<!-- Featured Content Section -->
<h2>FEATURED CONTENT</h2>

<section class="featured-content-section">
  <div class="container">
    <!-- Static Content Cards Grid -->
    <div class="content-cards">
      <!-- Card 1 -->
      <div class="content-card">
        <h3 class="card-title">Every GitHub Repository Should Be A Dataset</h3>
        <p class="card-description">
          Learn how turning repositories into smart datasets could supercharge organizations
        </p>
        <div class="card-type">BLOG POST</div>
        <a href="https://opensauced.pizza/blog/github-repos-as-datasets" target="_blank" class="card-link" aria-label="Read more about GitHub repositories as datasets">
          <span class="arrow-icon">→</span>
        </a>
      </div>
      
 <!-- Card 2 -->
  <div class="content-card">
    <h3 class="card-title">Content Strategy for Startups: Storytelling as a Growth Driver</h3>
    <p class="card-description">
      Understand and optimize content for your team.
    </p>
    <div class="card-type">FRAMEWORK</div>
    <a href="https://bekahhw.com/startup-content-strategy" target="_blank" class="card-link" aria-label="Read more about Storytelling-Driven Content">
      <span class="arrow-icon">→</span>
    </a>
  </div>
  
  <!-- Card 3 -->
  <div class="content-card">
    <h3 class="card-title">The Power of Storytelling</h3>
    <p class="card-description">
      Human stories in a digital world.
    </p>
    <div class="card-type">KEYNOTE</div>
    <a href="https://www.youtube.com/live/Dcz0dOQmcaE?si=iy-cVE_51kBmrALF" target="_blank" class="card-link" aria-label="Watch the keynote on The Power of Storytelling">
      <span class="arrow-icon">→</span>
    </a>
  </div>
  
  <!-- Card 4  -->
  <div class="content-card">
    <h3 class="card-title">Open Source Education</h3>
    <p class="card-description">
      Empowering Your Open Source Journey: From First Contribution to Project Leadership
    </p>
    <div class="card-type">COURSES</div>
    <a href="https://opensauced.pizza/learn" target="_blank" class="card-link" aria-label="Take a course on Open Source Education">
      <span class="arrow-icon">→</span>
    </a>
  </div>
  
  <!-- Card 5 -->
  <div class="content-card">
    <h3 class="card-title">"Lunch" Week</h3>
    <p class="card-description">
      Drove campaign to increase awareness, drive engagement, and build community.
    </p>
    <div class="card-type">LAUNCH CAMPAIGN</div>
    <a href="https://opensauced.pizza/lunchweek" target="_blank" class="card-link" aria-label="See our launch week">
      <span class="arrow-icon">→</span>
    </a>
  </div>
  
  <!-- Card 6 -->
  <div class="content-card">
    <h3 class="card-title">The Silent Crisis in Open Source: When Maintainers Walk Away</h3>
    <p class="card-description">
      The departure of a key maintainer can have far-reaching implications
    </p>
    <div class="card-type">BLOG</div>
    <a href="https://opensauced.pizza/blog/when-open-source-maintainers-leave" target="_blank" class="card-link" aria-label="Read more about when maintainers leave a project">
      <span class="arrow-icon">→</span>
    </a>
  </div>
</div>
  </div>
</section>

<!-- Creative Writing Portfolio Section -->
<section class="writing-portfolio-section">
  <a href="https://www.siblingswrite.com/" target="_blank" rel="noopener noreferrer" class="writing-portfolio-card">
    <div class="wp-stars"></div>
    <div class="wp-shooting-star"></div>
    <div class="wp-content">
      <span class="wp-badge">Creative Writing &amp; Publishing</span>
      <h3 class="wp-title">Siblings Write</h3>
      <p class="wp-desc">A collaborative creative writing space I share with my brothers — where imagination, whimsy, and wonder take the page.</p>
      <span class="wp-link">Explore our world →</span>
    </div>
  </a>
</section>

<script>
(function() {
  var container = document.querySelector('.wp-stars');
  if (!container) return;
  for (var i = 0; i < 55; i++) {
    var star = document.createElement('span');
    star.className = 'wp-star';
    star.style.left = (Math.random() * 100) + '%';
    star.style.top = (Math.random() * 100) + '%';
    var size = (0.8 + Math.random() * 2.4) + 'px';
    star.style.width = size;
    star.style.height = size;
    star.style.animationDelay = (Math.random() * 4) + 's';
    star.style.animationDuration = (1.5 + Math.random() * 2.5) + 's';
    container.appendChild(star);
  }
})();
</script>

<style>
.writing-portfolio-section {
  margin: 0 0 30px;
}

.writing-portfolio-card {
  display: block;
  position: relative;
  border-radius: 16px;
  padding: 44px 40px 38px;
  overflow: hidden;
  text-decoration: none;
  min-height: 220px;
  cursor: pointer;
  background: linear-gradient(135deg, #f9f4ec 0%, #ede4d0 100%);
  border: 1px solid #d4c4a0;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);
  transition: box-shadow 0.5s ease, border-color 0.5s ease;
}

/* Night-sky gradient overlay */
.writing-portfolio-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 25% 55%, #1e0a42 0%, #0a0f2e 45%, #0d1a3a 72%, #060d28 100%);
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.7s ease;
  z-index: 0;
}

.writing-portfolio-card:hover {
  box-shadow: 0 8px 40px rgba(80, 40, 160, 0.45);
  border-color: rgba(120, 80, 200, 0.5);
}

.writing-portfolio-card:hover::before {
  opacity: 1;
}

/* Stars */
.wp-stars {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.wp-star {
  position: absolute;
  background: white;
  border-radius: 50%;
  opacity: 0;
}

.writing-portfolio-card:hover .wp-star {
  animation-name: wp-twinkle;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  /* animation-delay and animation-duration are set inline per star by JS */
}

@keyframes wp-twinkle {
  0%   { opacity: 0;   transform: scale(0.7); }
  25%  { opacity: 0.95; transform: scale(1.3); }
  55%  { opacity: 0.4;  transform: scale(0.9); }
  80%  { opacity: 1.0;  transform: scale(1.2); }
  100% { opacity: 0;   transform: scale(0.7); }
}

/* Shooting star */
.wp-shooting-star {
  position: absolute;
  top: 10%;
  left: -140px;
  width: 110px;
  height: 2px;
  background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0.85) 75%, white 100%);
  border-radius: 100px;
  transform: rotate(20deg);
  opacity: 0;
  z-index: 2;
  pointer-events: none;
}

.writing-portfolio-card:hover .wp-shooting-star {
  animation: wp-shoot 3.8s ease-in-out 0.35s infinite;
}

@keyframes wp-shoot {
  0%   { opacity: 0;  transform: rotate(20deg) translateX(0); }
  6%   { opacity: 1; }
  38%  { opacity: 0;  transform: rotate(20deg) translateX(1400px); }
  100% { opacity: 0;  transform: rotate(20deg) translateX(1400px); }
}

/* Content */
.wp-content {
  position: relative;
  z-index: 3;
}

.wp-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #8a7a5a;
  margin-bottom: 14px;
  transition: color 0.5s ease;
}

.writing-portfolio-card:hover .wp-badge {
  color: rgba(180, 160, 255, 0.85);
}

.wp-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 32px;
  font-weight: bold;
  color: #0a1724;
  margin: 0 0 16px;
  line-height: 1.2;
  transition: color 0.5s ease, text-shadow 0.5s ease;
}

.writing-portfolio-card:hover .wp-title {
  color: #fff;
  text-shadow:
    0 0 14px rgba(210, 180, 255, 0.95),
    0 0 34px rgba(160, 110, 255, 0.65),
    0 0 60px rgba(100, 60, 220, 0.4);
}

.wp-desc {
  font-size: 15px;
  line-height: 1.65;
  color: #5a4f40;
  margin: 0 0 28px;
  max-width: 520px;
  transition: color 0.5s ease;
}

.writing-portfolio-card:hover .wp-desc {
  color: rgba(215, 205, 240, 0.9);
}

.wp-link {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  color: #6b4fa0;
  background: rgba(100, 60, 180, 0.08);
  padding: 9px 20px;
  border-radius: 24px;
  border: 1px solid rgba(100, 60, 180, 0.22);
  transition: color 0.5s ease, background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease;
  letter-spacing: 0.5px;
}

.writing-portfolio-card:hover .wp-link {
  color: #e8d8ff;
  background: rgba(140, 90, 255, 0.25);
  border-color: rgba(180, 140, 255, 0.55);
  box-shadow: 0 0 18px rgba(140, 90, 255, 0.45), inset 0 0 8px rgba(140, 90, 255, 0.12);
}

@media (max-width: 480px) {
  .writing-portfolio-card {
    padding: 30px 20px;
  }
  .wp-title {
    font-size: 24px;
  }
}
</style>

<!-- CTA Section -->
<div class="contact-cta">
  <h3>Let's Work Together!</h3>
  <p>Want to collaborate, speak together, feature me on your podcast, or hire me? I'd love to connect and discuss how we can create something amazing.</p>
  <a href="https://bekahhw.com/contact" class="cta-link">Get in Touch →</a>
</div>

<!-- Developer Strategy & Execution Card -->
<details class="card">
  <summary>
    <h3>Developer Strategy & Execution</h3>
    <div class="summary-header">
      Led DevRel and content strategies that increased engagement, educated devs, and drove product growth through contributor journeys, OSS campaigns, and SEO-driven content.
    </div>
    <div class="summary-footer">
      <span class="card-arrow" aria-hidden="true"></span>
    </div>
  </summary>
  <ul>
    <li><strong>Growth Content:</strong> Authored a content strategy that led to a <strong>57% increase in pageviews</strong> and doubled click rates over 3 months <a href="https://opensauced.pizza/blog">[OpenSauced Blog]</a></li>
    <li><strong>Courses & Learning:</strong> Launched <a href="https://opensauced.pizza/learn/intro-to-oss">Intro to Open Source</a> and <a href="https://opensauced.pizza/learn/becoming-a-maintainer">Becoming a Maintainer</a> courses — over 300 participants.</li>
    <li><strong>Product Campaigns:</strong> Led messaging and execution for <a href="https://opensauced.pizza/blog/introducing-OSCR">OSCR</a>, <a href="https://opensauced.pizza/docs/features/dev-card/">Dev Cards</a>, and <a href="https://opensauced.pizza/lunchweek">Lunch Week</a> launches, resulting in record sign-ups.</li>
    <li><strong>Developer Workflows:</strong> Created targeted email drip campaigns for contributors, maintainers, and orgs to support onboarding and adoption.</li>
    <li><strong>Docs Infrastructure:</strong> Migrated docs to a Next.js subdirectory, improving accessibility and leading to a <strong>30% monthly view increase</strong>.</li>
    <li><strong>Newsletter Strategy:</strong> Edited and revamped <a href="https://sauced.ghost.io/">OpenSauced newsletter</a>, increasing engagement and CTRs.</li>
  </ul>
</details>

<!-- Community & OSS Advocacy Card -->
<details class="card">
  <summary>
    <h3>Community & Open Source Advocacy</h3>
    <div class="summary-header">
      Built inclusive developer communities and contributor programs that scale — from founding Virtual Coffee to mentoring newcomers and creating cross-org partnerships.
    </div>
    <div class="summary-footer">
      <span class="card-arrow" aria-hidden="true"></span>
    </div>
  </summary>
  <ul>
    <li><strong><a href="https://virtualcoffee.io/">Virtual Coffee:</a></strong> Founded a 1,000+ member developer community, hosted 250+ events, led mentorship, and created monthly challenges <a href="https://virtualcoffee.io/monthlychallenges">[Monthly Challenges]</a></li>
    <li><strong>#100DaysOfOSS:</strong> Designed a GitHub Education-supported program to help early contributors build experience <a href="https://opensauced.pizza/docs/community-resources/100daysofoss-growing-skills-and-real-world-experience/">[Learn More]</a></li>
    <li><strong>Docs & Guides:</strong> Wrote contributor onboarding and documentation for <a href="https://opensauced.pizza/docs/">OpenSauced</a> and <a href="https://vc-community-docs.netlify.app/docs/">Virtual Coffee</a></li>
    <li><strong>Hacktoberfest:</strong> Created <a href="https://hacktoberfest.virtualcoffee.io/">Virtual Coffee's OSS initiative</a> since 2021, guiding contributors through PRs and mentorship</li>
    <li><strong>Livestreams & Podcasts:</strong> Co-hosted <a href="https://virtualcoffee.io/podcast/">The Virtual Coffee Podcast</a>, hosted 50+ X Spaces, and appeared on industry podcasts including <a href="https://www.youtube.com/live/Dcz0dOQmcaE?si=kaF2tAFuBX3P3yIs">SE Unlocked</a>, <a href="https://www.codenewbie.org/podcast/moms-who-code">CodeNewbie</a>, and <a href="https://www.youtube.com/watch?v=_smGYgKnu-o">The Undefined Podcast</a></li>
    <li><strong>Conference Partnerships:</strong> Collaborated with GitHub Education, CFE.dev, and MagnoliaJS to grow OSS contributor impact and awareness <a href="https://www.youtube.com/live/EvDJpN-jJgo?si=XeUHuFpupgCTb1RK">[Code & Coffee]</a></li>
    <li><strong><a href="https://www.youtube.com/live/WhqURueG6Ao?feature=share">Testing with Cypress</a></strong> — Mission Impossible Prep: A practical testing workshop</li>
    <li><strong><a href="https://www.youtube.com/watch?v=MVxvH54uLrE">How to Apologize</a></strong> — Communication skills for better relationships</li>
    <li><strong>Additional Conference Talks:</strong> <a href="/code-and-community">View all talks</a></li>
  </ul>
</details>
<!-- Developer Education & Enablement Section -->
<div class="dev-education-section-row">
<div class="icon-cards-row">
<!-- Education & Docs Card -->
<div class="icon-card">
<div class="icon-bg" aria-hidden="true">
<!-- Notebook Icon -->
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="15" width="70" height="90" rx="2" ry="2" fill="white" stroke="black" stroke-width="2"/>
<path d="M20,25 h10 M20,35 h10 M20,45 h10 M20,55 h10 M20,65 h10 M20,75 h10" stroke="black" stroke-width="2" stroke-linecap="round"/>
<path d="M35,30 h30 M35,40 h30 M35,50 h30 M35,60 h30 M35,70 h30" stroke="#444" stroke-width="1"/>
<g transform="rotate(-45, 65, 40)">
  <rect x="60" y="20" width="10" height="40" rx="2" ry="2" fill="white" stroke="black" stroke-width="1.5"/>
  <path d="M60,20 l5,-10 l5,10" fill="white" stroke="black" stroke-width="1.5"/>
  <rect x="60" y="50" width="10" height="10" rx="1" ry="1" fill="black"/>
</g>
</svg>
</div>
<h3>Education & Docs</h3>
<p>Create educational resources, improve documentation, and deliver engaging workshops</p>
</div>

<!-- Dev Advocacy Card -->
<div class="icon-card">
<div class="icon-bg" aria-hidden="true">
<!-- Git Branch Icon -->
<svg viewBox="0 0 24 24" width="24" height="24">
<circle cx="7" cy="7" r="3" fill="white" />
<circle cx="7" cy="17" r="3" fill="white" />
<circle cx="17" cy="17" r="3" fill="white" />
<line x1="7" y1="7" x2="7" y2="14" stroke="white" stroke-width="2" />
<line x1="7" y1="14" x2="17" y2="14" stroke="white" stroke-width="2" />
<line x1="17" y1="14" x2="17" y2="17" stroke="white" stroke-width="2" />
</svg>
</div>
<h3>Developer Advocacy</h3>
<p>Champion developers through content, mentorship, and connection. Build bridges between people, products, and purpose.</p>
</div>

<!-- Speaking & Hosting Card -->
<div class="icon-card">
<div class="icon-bg" aria-hidden="true">
<!-- Star Icon -->
<svg viewBox="0 0 24 24" width="24" height="24">
<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white" />
</svg>
</div>
<h3>Speaking & Hosting</h3>
<p>Host and speak at in-person and virtual conferences, podcasts, and tech events</p>
</div>

<!-- Learning Systems Card -->
<div class="icon-card">
  <div class="icon-bg" aria-hidden="true">
    <!-- Bar Chart Icon -->
    <svg viewBox="0 0 24 24" width="24" height="24">
      <rect x="4" y="10" width="3" height="10" fill="white" stroke="black" stroke-width="1.5"/>
      <rect x="10" y="6" width="3" height="14" fill="white" stroke="black" stroke-width="1.5"/>
      <rect x="16" y="2" width="3" height="18" fill="white" stroke="black" stroke-width="1.5"/>
    </svg>
  </div>
  <h3>Learning Systems & Metrics</h3>
  <p>Build scalable content workflows with clear success metrics, automation, and developer-first feedback loops.</p>
</div>


<style>
  .dev-education-section-row {
  background-color: #11273c;
  color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
}

.dev-education-section-row h2 {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: white;
    margin-top: 0px;

}

.icon-cards-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.icon-card {
  background-color: #f5f2e9;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  color: #0a1724;
}

.icon-bg {
  background-color: #0a1724;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  margin: 0 auto 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-bg svg {
  width: 24px;
  height: 24px;
  color: white;
}

.icon-card h3 {
  font-size: 16px;
  margin: 0 0 5px;
}

.icon-card p {
  font-size: 13px;
  color: #555;
  margin: 0;
}

/* Responsive fallback */
@media (max-width: 768px) {
  .icon-cards-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .icon-cards-row {
    grid-template-columns: 1fr;
  }
}
</style>