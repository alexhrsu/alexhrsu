/*
 * ─────────────────────────────────────────────────────────────
 *  ALEX IN MADRID — site content
 *  Edit this file to update the site. No other code changes needed.
 * ─────────────────────────────────────────────────────────────
 *
 *  REELS
 *  - url:      the public Instagram link, e.g. https://www.instagram.com/reel/ABC123xyz/
 *  - cover:    a 9:16 image in assets/reels/ (screenshot of the reel's first frame works great).
 *              Leave "" to show a coloured placeholder.
 *  - views / likes / comments / shares: numbers copied from Instagram Insights.
 *              Instagram does not expose these publicly, so they are entered here by hand.
 *  - series:   must match one of the SERIES ids below (used for the filter chips).
 */

window.SITE = {
  handle: "alex.in.madrid",
  instagram: "https://www.instagram.com/alex.in.madrid/",
  tiktok: "https://www.tiktok.com/@alex.in.madrid",
  email: "hello@alexinmadrid.com", // TODO: replace with your real contact email

  stats: [
    { value: "48K", label: "Followers across IG & TikTok" },   // TODO
    { value: "6.2M", label: "Total views" },                    // TODO
    { value: "9.4%", label: "Avg. engagement rate" },           // TODO
    { value: "120+", label: "Madrid spots featured" },          // TODO
  ],

  series: [
    { id: "all", label: "All" },
    { id: "sfvsmadrid", label: "SF vs Madrid" },
    { id: "neighborhood", label: "Neighborhood guides" },
    { id: "food", label: "Food & tardeo" },
    { id: "free", label: "Free things" },
    { id: "weekend", label: "Weekend bundles" },
  ],

  // TODO: replace with your real top reels (best performers first)
  reels: [
    { url: "https://www.instagram.com/reel/REPLACE_ME_1/", cover: "", series: "sfvsmadrid",
      caption: "Madrid is too cheap? SF vs Madrid: a night out", views: 1240000, likes: 86400, comments: 2310, shares: 15200 },
    { url: "https://www.instagram.com/reel/REPLACE_ME_2/", cover: "", series: "neighborhood",
      caption: "Madrid's best vermut: Lavapiés edition", views: 812000, likes: 54100, comments: 1890, shares: 9800 },
    { url: "https://www.instagram.com/reel/REPLACE_ME_3/", cover: "", series: "free",
      caption: "12 free things to do in Madrid this month", views: 690000, likes: 41200, comments: 960, shares: 21400 },
    { url: "https://www.instagram.com/reel/REPLACE_ME_4/", cover: "", series: "food",
      caption: "The tardeo guide nobody told you about", views: 455000, likes: 33800, comments: 1120, shares: 6700 },
    { url: "https://www.instagram.com/reel/REPLACE_ME_5/", cover: "", series: "weekend",
      caption: "Perfect Madrid weekend under €100", views: 398000, likes: 27600, comments: 740, shares: 8300 },
    { url: "https://www.instagram.com/reel/REPLACE_ME_6/", cover: "", series: "neighborhood",
      caption: "Madrid's best brunch: Malasaña edition", views: 341000, likes: 22900, comments: 1510, shares: 4100 },
    { url: "https://www.instagram.com/reel/REPLACE_ME_7/", cover: "", series: "sfvsmadrid",
      caption: "Madrid is too loud? SF vs Madrid: Sunday", views: 287000, likes: 19800, comments: 880, shares: 2900 },
    { url: "https://www.instagram.com/reel/REPLACE_ME_8/", cover: "", series: "weekend",
      caption: "3 day trips from Madrid by train", views: 236000, likes: 16400, comments: 520, shares: 7600 },
  ],

  // TODO: adjust to the services you actually offer
  services: [
    { icon: "🎬", title: "Sponsored Reels & TikToks",
      text: "A dedicated short-form video for your venue, product or event, scripted, shot and edited in my style and posted to my audience.",
      tag: "Most requested" },
    { icon: "📱", title: "UGC for your channels",
      text: "Authentic vertical content delivered to you to post on your own accounts or run as ads. Full usage rights included." },
    { icon: "🍷", title: "Venue & restaurant features",
      text: "Get included in a neighborhood guide or tardeo roundup, the series where Madrid locals and visitors decide where to go next." },
    { icon: "🎟️", title: "Event coverage",
      text: "Openings, launches and festivals covered live in Stories, then recapped in a reel the same week." },
    { icon: "🗺️", title: "Custom Madrid itineraries",
      text: "Personal day-by-day plans for visitors and new arrivals, built from 120+ places I've actually been to." },
    { icon: "📈", title: "Social strategy for local brands",
      text: "A content plan for Madrid businesses that want to grow on Reels and TikTok: hooks, formats and a posting rhythm." },
  ],

  // Optional: brands / venues you've worked with. Leave empty to hide the strip.
  brands: ["Your brand here", "Mercado de San Miguel", "Madrid Río", "Tardeo Club", "Casa Example"], // TODO
};
