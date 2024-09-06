import { resolve } from "path";

const sleep = async (ms: number) => {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export { sleep };
