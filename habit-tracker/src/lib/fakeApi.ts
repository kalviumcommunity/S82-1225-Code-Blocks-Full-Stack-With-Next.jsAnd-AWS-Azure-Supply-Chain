export function saveUser(data: any) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.2 ? resolve(data) : reject();
    }, 1500);
  });
}
