const queue = require('async/queue');

const resolveFunctionProcess = (processFunction, item) => processFunction(item.item)
  .then(result => finalResult.push({ ...item, result }));

const processQueue = (processFunction, chunkSize) => queue(
  (item) => resolveFunctionProcess(processFunction, item),
  chunkSize,
);

const chunkedRun = (dataArray, processFunction, chunkSize) => new Promise((resolve) => {
  if (dataArray.length === 0) resolve([]);

  const finalResult = [];

  const queueEngine = processQueue(processFunction, chunkSize);

  queueEngine.drain(() => {
    resolve(finalResult
      .sort((act, next) => (act.index > next.index ? 1 : -1))
      .map(item => item.result || item.error));
  });

  queueEngine.error((error, item) => {
    finalResult.push({ ...item, error });
  });

  queueEngine.push(dataArray.map((item, index) => ({ index, item })));
});

module.exports = chunkedRun;
