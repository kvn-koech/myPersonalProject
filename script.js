document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://mypersonalproject-a2op.onrender.com/bookmarks";
  const form = document.getElementById("bookmark-form");
  const bookmarksList = document.getElementById("bookmarks-list");
  const tagFilter = document.getElementById("tag-filter");


  // Fetch all bookmarks and render them
  function fetchBookmarks() {
    fetch(API_URL)
      .then((res) => res.json())
      .then((bookmarks) => {
        renderBookmarks(bookmarks);
        updateTagFilter(bookmarks);
        
      });
  }

  // Render bookmarks to the DOM
  function renderBookmarks(bookmarks) {
    bookmarksList.innerHTML = "";
    bookmarks.forEach((bookmark) => {
      const bookmarkEl = document.createElement("div");
      bookmarkEl.className = "bookmark";
      bookmarkEl.innerHTML = `
        <div>
          <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
          <div class="tags">${bookmark.tags.join(", ")}</div>
        </div>
        <button data-id="${bookmark.id}">Delete</button>
      `;
      bookmarksList.appendChild(bookmarkEl);
    });
  }

  // Update the tag filter dropdown
  function updateTagFilter(bookmarks) {
    const allTags = new Set();
    bookmarks.forEach((bookmark) => {
      bookmark.tags.forEach((tag) => allTags.add(tag));
    });

    tagFilter.innerHTML = '<option value="all">All</option>';
    allTags.forEach((tag) => {
      const option = document.createElement("option");
      option.value = tag;
      option.textContent = tag;
      tagFilter.appendChild(option);
    });
  }

  // Add a new bookmark
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const url = document.getElementById("url").value;
    const tags = document.getElementById("tags").value.split(",").map(tag => tag.trim());

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, url, tags }),
    })
      .then(() => {
        form.reset();
        fetchBookmarks();
      });
  });

  // Delete a bookmark
  bookmarksList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const id = e.target.dataset.id;
      fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      }).then(fetchBookmarks);
    }
  });

  // Filter bookmarks by tag
  tagFilter.addEventListener("change", () => {
    const selectedTag = tagFilter.value;
    fetch(API_URL)
      .then((res) => res.json())
      .then((bookmarks) => {
        const filtered = selectedTag === "all" 
          ? bookmarks 
          : bookmarks.filter(bookmark => bookmark.tags.includes(selectedTag));
        renderBookmarks(filtered);
      });
  });

  // Initial load
  fetchBookmarks();
});
