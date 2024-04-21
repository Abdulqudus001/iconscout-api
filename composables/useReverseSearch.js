export default function () {
  const showResizeContainer = ref(false);
  const loadingImgSourceError = ref(false);
  const image = ref('');

  const loadImage = (event) => {
    loadingImgSourceError.value = false;
    const { files } = event.target;
    // Ensure that you have a file before attempting to read it
    if (files && files[0]) {
      // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
      if (image.value) {
        URL.revokeObjectURL(image.value);
      }
      // 2. Create the blob link to the file to optimize performance:
      const blob = URL.createObjectURL(files[0]);

      const reader = new FileReader();
      // Define a callback function to run, when FileReader finishes its job
      reader.onload = () => {
        // Note: arrow function used here, so that "this.image" refers to the image of Vue component
        image.value = blob;
      };
      // Start the reader job - read file as a data url (base64 format)
      reader.readAsArrayBuffer(files[0]);
      showResizeContainer.value = true;
    }
  };

  const setImageSource = (img) => {
    loadingImgSourceError.value = false;
    image.value = img;
    showResizeContainer.value = true;
  };

  const handleImageLoadingError = () => {
    showResizeContainer.value = false;
    loadingImgSourceError.value = true;
  };

  return {
    loadImage,
    image,
    showResizeContainer,
    setImageSource,
    handleImageLoadingError,
    loadingImgSourceError,
  };
}
