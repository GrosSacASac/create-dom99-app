export {createFeedExtension};

const createFeedExtension = function (d, extensions) {
  const originalFeed = d.feed;
  return function (startPath, data) {
    if (data === undefined) {
        data = startPath;
        startPath = ``;
    }
    
    extensions.forEach(function (extension) {
      extension(d, startPath, data);
    });

    
    return originalFeed(startPath, data);

  };
};
