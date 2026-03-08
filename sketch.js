function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  
}

function draw() {
  background(200);
  line(mouseX, mouseY, pmouseX, pmouseY);
  circle(mouseX, mouseY, 50);
  console.log(mouseX);
}

// Reveal About/Contact on scroll (mobile only) 
const revealEls = document.querySelectorAll(".reveal");

function setupReveal(){
  // 只在手机端启用
  if (!window.matchMedia("(max-width: 768px)").matches) {
    revealEls.forEach(el => el.classList.add("is-visible")); 
    return;
  }

  // 初始先隐藏
  revealEls.forEach(el => el.classList.remove("is-visible"));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: "0px 0px -10% 0px"
  });

  revealEls.forEach(el => io.observe(el));
}

setupReveal();

window.addEventListener("resize", () => {
  setupReveal();
}, { passive: true });

// Albums dropdown click control
const albumsToggle = document.querySelector("#nov .dropdown-toggle");
const albumsItem = document.querySelector("#nov .has-dropdown");

// 点击 Albums 打开 / 关闭
albumsToggle.addEventListener("click", function(e){
  e.preventDefault();
  e.stopPropagation(); // 防止触发 document 的点击
  albumsItem.classList.toggle("open");
});

// 点击页面其它地方关闭 dropdown
document.addEventListener("click", function(e){
  if(!albumsItem.contains(e.target)){
    albumsItem.classList.remove("open");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape"){

    const dropdown = document.querySelector("#nov .has-dropdown");
    const toggle = document.querySelector("#nov .dropdown-toggle");

    if (dropdown){
      dropdown.classList.remove("open");
    }

    if (toggle){
      toggle.setAttribute("aria-expanded","false");
    }

  }
});
