// スクロール時のヘッダー制御：
// ファーストビュー上では背景を透明にし、少しスクロールしたら白背景へ切り替えて可読性を保つ。
const header = document.querySelector(".site-header");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

// 初期表示時にも現在位置を判定し、リロード時のスクロール位置に合わせて見た目を同期する。
updateHeader();
window.addEventListener("scroll", updateHeader);

// Intersection Observerによるフェードイン処理：
// .reveal要素が画面内に入ったタイミングで表示状態にし、スクロールに合わせて自然に見せる。
const revealTargets = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        // 一度表示された要素は監視を外し、不要な再計算を減らす。
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px",
  }
);

revealTargets.forEach((target) => revealObserver.observe(target));
