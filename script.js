const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image at ${imageUrl}`);
    img.src = imageUrl;
  });
}

function downloadImages() {
  loading.style.display = "block";
  errorDiv.style.display = "none";

  const imagePromises = images.map(image => downloadImage(image.url));

  Promise.all(imagePromises)
    .then((imageElements) => {
      loading.style.display = "none";
      imageElements.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      loading.style.display = "none";
      errorDiv.style.display = "block";
      errorDiv.textContent = error;
    });
}

btn.addEventListener("click", downloadImages);
