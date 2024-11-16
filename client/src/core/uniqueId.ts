function uniqueId(): string {
  return btoa(crypto.randomUUID().split('-')[4]).replace(/[0-9]/g, num =>
    String.fromCharCode(97 + parseInt(num)),
  );
}

export { uniqueId };
