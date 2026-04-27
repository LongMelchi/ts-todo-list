// 例子 1：最简单的 async 函数
// sayHello() 是一个 async 函数，它会自动返回一个 Promise 对象
// .then() 方法用来 等待 这个 Promise 完成，并 处理 它的结果
// result => {...} 是一个回调函数，当 Promise 成功时，会把结果作为参数传入这个函数

async function sayHello() {
  return "Hello!";
}

sayHello().then(x => {
  console.log(x); // 输出: Hello!
});

// 如果使用 await ，同样的代码可以写成：
// 两种写法效果是一样的，但 await 让代码看起来更像同步代码，更易读。
async function main() {
  const result = await sayHello();
  console.log(result); // 输出: Hello!
}


// 例子 2：使用 await 等待一个延时
// 1秒后打印 "Hello!"
setTimeout(() => {
  console.log("Hello!");
}, 1000);

// 这里的 x 其实是 Promise 的 resolve 函数。
// 当 setTimeout 在 ms 毫秒后执行时，会调用 x() （即 resolve() ），从而让 Promise 完成。
function delay(ms: number) {
  return new Promise(x => setTimeout(x, ms));
}

async function run() {
  console.log("开始...");
  await delay(2000); // 等待 2 秒
  console.log("2 秒后执行!");
}


// 例子 3：模拟获取数据
// resolve 函数可以传递任意类型的参数
// 传递的参数会成为 Promise 的成功结果
// 可以通过 .then() 或 await 来获取这个结果
function fetchUser(id: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: "小明", age: 20 });
    }, 1000);
  });
}

async function getUserInfo() {
  console.log("正在获取用户信息...");
  const user = await fetchUser(1);
  console.log(`用户名: ${(user as { name: string; age: number }).name}, 年龄: ${(user as { name: string; age: number }).age}`);
}

getUserInfo()


// 例子 4：依次等待多个异步操作
// 代码看起来像同步的，但实际上每一步都等待上一完成才执行。
function delay2(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadData() {
  await delay(1000);
  console.log("第1步完成");
  
  await delay(1000);
  console.log("第2步完成");
  
  await delay(1000);
  console.log("第3步完成");
}

loadData();


// 例子 5：并行执行（用 Promise.all）
// 虽然 B 需要 2 秒，C 只需要 0.5 秒，但整体只用了 2 秒 （取最长的那个），这就是并行执行的好处。
function delay3(ms: number, name: string) {
  return new Promise(resolve => setTimeout(() => resolve(name), ms));
}

async function loadAll() {
  console.log("开始并行加载...");
  
  const results = await Promise.all([
    delay3(1000, "任务A"),
    delay3(2000, "任务B"),
    delay3(500, "任务C")
  ]);

  console.log("全部完成:", results); // ["任务A", "任务B", "任务C"]
}
loadAll();


// 例子 6：错误处理（try-catch）
function mayFail(shouldFail: boolean) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("出错了!"));
      } else {
        resolve("成功!");
      }
    }, 1000);
  });
}

async function handleRequest() {
  try {
    const result = await mayFail(false);
    console.log(result); // "成功!"
  } catch (error) {
    console.log("捕获到错误:", (error as Error).message);
  }

  try {
    const result = await mayFail(true);
    console.log(result);
  } catch (error) {
    console.log("捕获到错误:", (error as Error).message); // "出错了!"
  }  

}
