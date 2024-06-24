// A mock function to mimic making an async request for data
export function fetchCount(count = 1) {
  return new Promise<{ data: number }>((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({ data: count });
      } else {
        reject();
      }
    }, 1000),
  );
}
