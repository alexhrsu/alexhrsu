(() => {
  const S = window.SITE;
  const $ = (id) => document.getElementById(id);

  const fmt = (n) => {
    if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, "") + "M";
    if (n >= 1e4) return Math.round(n / 1e3) + "K";
    if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
    return String(n);
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Instagram-style icons
  const ICON = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z" fill="currentColor"/></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.8 3.5c-2 0-3.6 1.1-4.8 2.8-1.2-1.7-2.8-2.8-4.8-2.8A5 5 0 0 0 2 8.6c0 5.6 8.2 11 9.6 11.9.3.2.6.2.8 0 1.4-.9 9.6-6.3 9.6-11.9a5 5 0 0 0-5.2-5.1Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>',
    comment: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.7 16.4A9.5 9.5 0 1 0 17 20l4 1.2z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>',
    share: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 3 9.2 10.1M22 3l-7 18-3.8-8.3L2 9.5z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>',
    reel: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M2.5 8h19M9 2.5 12 8M15 2.5 18 8M10 11.5v6l5-3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  };

  // Stats
  $("stats").innerHTML = S.stats
    .map((s) => `<div class="stat"><span class="stat-value">${esc(s.value)}</span><span class="stat-label">${esc(s.label)}</span></div>`)
    .join("");

  // Brands
  if (S.brands && S.brands.length) {
    $("brands").hidden = false;
    const items = S.brands.map((b) => `<span>${esc(b)}</span>`).join("<i>✦</i>");
    $("brandTrack").innerHTML = `<div>${items}<i>✦</i></div><div aria-hidden="true">${items}<i>✦</i></div>`;
  }

  // Reels
  const seriesLabel = Object.fromEntries(S.series.map((s) => [s.id, s.label]));
  const card = (r, i) => `
    <article class="reel" data-series="${esc(r.series)}" style="--i:${i}">
      <button class="reel-cover ph-${i % 6}" data-url="${esc(r.url)}" aria-label="Watch: ${esc(r.caption)}">
        ${r.cover ? `<img src="${esc(r.cover)}" alt="" loading="lazy">` : `<span class="ph-text">${esc(r.caption)}</span>`}
        <span class="reel-badge">${ICON.reel}</span>
        <span class="reel-views">${ICON.play}${fmt(r.views)}</span>
        <span class="reel-play">${ICON.play}</span>
      </button>
      <div class="reel-meta">
        <div class="reel-actions">
          <span title="${r.likes.toLocaleString()} likes">${ICON.heart}${fmt(r.likes)}</span>
          <span title="${r.comments.toLocaleString()} comments">${ICON.comment}${fmt(r.comments)}</span>
          <span title="${r.shares.toLocaleString()} shares">${ICON.share}${fmt(r.shares)}</span>
        </div>
        <p class="reel-caption"><strong>${esc(S.handle)}</strong> ${esc(r.caption)}</p>
        <p class="reel-series">${esc(seriesLabel[r.series] || "")}</p>
      </div>
    </article>`;
  $("reelGrid").innerHTML = S.reels.map(card).join("");

  // Filter chips
  const used = new Set(S.reels.map((r) => r.series));
  $("chips").innerHTML = S.series
    .filter((s) => s.id === "all" || used.has(s.id))
    .map((s, i) => `<button class="chip${i === 0 ? " active" : ""}" data-filter="${esc(s.id)}" role="tab">${esc(s.label)}</button>`)
    .join("");
  $("chips").addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === b));
    const f = b.dataset.filter;
    document.querySelectorAll(".reel").forEach((el) => {
      el.hidden = f !== "all" && el.dataset.series !== f;
    });
  });

  // Modal with official Instagram embed
  const modal = $("modal");
  let igLoaded = false;
  const openReel = (url) => {
    $("embedSlot").innerHTML = `
      <blockquote class="instagram-media" data-instgrm-permalink="${esc(url)}" data-instgrm-version="14"
        style="background:#fff;border:0;margin:0;max-width:400px;min-width:300px;width:100%">
        <a href="${esc(url)}" target="_blank" rel="noopener">View this reel on Instagram</a>
      </blockquote>`;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else if (!igLoaded) {
      igLoaded = true;
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://www.instagram.com/embed.js";
      document.body.appendChild(s);
    }
  };
  const close = () => {
    modal.hidden = true;
    $("embedSlot").innerHTML = "";
    document.body.style.overflow = "";
  };
  $("reelGrid").addEventListener("click", (e) => {
    const b = e.target.closest(".reel-cover");
    if (b) openReel(b.dataset.url);
  });
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) close(); });

  // Services
  $("serviceGrid").innerHTML = S.services
    .map((s) => `
      <article class="service">
        ${s.tag ? `<span class="service-tag">${esc(s.tag)}</span>` : ""}
        <span class="service-icon">${s.icon}</span>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
      </article>`)
    .join("");

  // Links
  $("igLink").href = S.instagram;
  $("igSocial").href = S.instagram;
  $("ttSocial").href = S.tiktok;
  $("emailBtn").href = `mailto:${S.email}?subject=${encodeURIComponent("Collaboration with Alex in Madrid")}`;
  $("year").textContent = new Date().getFullYear();

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reel, .service, .stat, .section-head, .about > *").forEach((el) => io.observe(el));
})();
