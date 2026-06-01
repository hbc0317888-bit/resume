// 视差滚动
const parallaxLayers = document.querySelectorAll(".parallax-layer");
window.addEventListener(
  "scroll",
  () => {
    const scrollY = window.scrollY || window.pageYOffset;
    parallaxLayers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.depth || 0.1);
      const movement = scrollY * depth * -0.15;
      layer.style.transform = `translate3d(0, ${movement}px, 0)`;
    });
  },
  { passive: true }
);

// 滚动渐显
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".scroll-fade").forEach((el) => observer.observe(el));

// 导航平滑滚动
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const headerOffset = 76;
    const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  });
});

// 联系方式复制
const toast = document.getElementById("copy-toast");
function showCopyToast(msg) {
  if (!toast) return;
  toast.textContent = msg || "已复制";
  toast.classList.add("show");
  clearTimeout(window._copyToastTimer);
  window._copyToastTimer = setTimeout(() => {
    toast.classList.remove("show");
    toast.textContent = "已复制";
  }, 1500);
}

document.querySelectorAll(".copy-contact").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const text = btn.getAttribute("data-copy");
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      showCopyToast();
    } catch {
      showCopyToast("复制失败，请手动复制");
    }
  });
});

// 移动端导航
const navToggle = document.querySelector(".nav-toggle");
const mobileNav = document.querySelector(".mobile-nav");
if (navToggle && mobileNav) {
  navToggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("hidden");
    navToggle.setAttribute("aria-expanded", !open);
  });
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.add("hidden");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}
