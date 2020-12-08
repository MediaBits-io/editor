export async function readBlobAsArrayBuffer(blob: Blob) {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      resolve(reader.result as ArrayBuffer);
    });

    reader.addEventListener('error', (e) => {
      reject(reader.error);
    });

    reader.readAsArrayBuffer(blob);
  });
}

export function readBlobAsDataURL(blob: Blob) {
  return new Promise<string>((resolve) => {
    var a = new FileReader();
    a.onload = (e) => {
      if (e.target) {
        resolve(e.target.result as string);
      }
    };
    a.readAsDataURL(blob);
  });
}

export function readBlobAsText(blob: Blob) {
  return new Promise<string>((resolve) => {
    var a = new FileReader();
    a.onload = (e) => {
      if (e.target) {
        resolve(e.target.result as string);
      }
    };
    a.readAsText(blob);
  });
}
