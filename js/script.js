// top-reset.js

// 1) ブラウザのスクロール位置復元を無効化
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// 2) リロードや離脱時に、位置をトップへ（復元対策の保険）
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

// 3) ページ読み込み時：もしURLにハッシュ(#about等)があれば削除してトップへ
window.addEventListener("load", () => {
  if (window.location.hash) {
    // ハッシュをURLから除去（検索クエリがあれば維持）
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );

    // レイアウト確定後にトップへ（確実に反映）
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  } else {
    // ハッシュが無い場合でも、"リロード" ならトップへ（環境によって復元するため）
    const nav = performance.getEntriesByType("navigation")[0];
    if (nav && nav.type === "reload") {
      window.scrollTo(0, 0);
    }
  }
});
