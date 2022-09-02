// 红绿灯
function changeColor(color) {
  console.log("traffic-light ", color);
}

function main() {
  changeColor("red");

  setTimeout(() => {
    changeColor("yellow");

    setTimeout(() => {
      changeColor("green");

      setTimeout(main, 3000);
    }, 2000);
  }, 1000);
}

main();

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

function changeColor(duration, color) {
  return new Promise((resolve) => {
    console.log("traffic-light ", color);

    sleep(duration).then(resolve);
  });
}

function main() {
  return new Promise((resolve) => {
    changeColor(2000, "red").then(() => {
      changeColor(1000, "yellow").then(() => {
        changeColor(3000, "green").then(() => {
          main();
        });
      });
    });
  });
}
main();

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

async function changeColor(color, duration) {
  console.log("traffic-light ", color);

  await sleep(duration);
}

async function main() {
  while (true) {
    await changeColor("red", 2000);

    await changeColor("yellow", 1000);

    await changeColor("green", 3000);
  }
}

main();
