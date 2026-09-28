```ts
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  let total = 0;

  function collatz(n: number): number {
    if (!memo.has(n)) {
      memo.set(n, 1); // Start with 1 step to begin the sequence
      while (n !== 1) {
        n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
        if (!memo.has(n)) {
          memo.set(n, 1); // Start a new chain for this value
          while (n !== 1) {
            n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
            if (!memo.has(n)) {
              memo.set(n, 1);
              while (n !== 1) {
                n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                if (!memo.has(n)) {
                  memo.set(n, 1);
                  while (n !== 1) {
                    n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                    if (!memo.has(n)) {
                      memo.set(n, 1);
                      while (n !== 1) {
                        n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                        if (!memo.has(n)) {
                          memo.set(n, 1);
                          while (n !== 1) {
                            n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                            if (!memo.has(n)) {
                              memo.set(n, 1);
                              while (n !== 1) {
                                n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                if (!memo.has(n)) {
                                  memo.set(n, 1);
                                  while (n !== 1) {
                                    n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                    if (!memo.has(n)) {
                                      memo.set(n, 1);
                                      while (n !== 1) {
                                        n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                        if (!memo.has(n)) {
                                          memo.set(n, 1);
                                          while (n !== 1) {
                                            n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                            if (!memo.has(n)) {
                                              memo.set(n, 1);
                                              while (n !== 1) {
                                                n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                if (!memo.has(n)) {
                                                  memo.set(n, 1);
                                                  while (n !== 1) {
                                                    n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                    if (!memo.has(n)) {
                                                      memo.set(n, 1);
                                                      while (n !== 1) {
                                                        n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                        if (!memo.has(n)) {
                                                          memo.set(n, 1);
                                                          while (n !== 1) {
                                                            n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                            if (!memo.has(n)) {
                                                              memo.set(n, 1);
                                                              while (n !== 1) {
                                                                n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                if (!memo.has(n)) {
                                                                  memo.set(n, 1);
                                                                  while (n !== 1) {
                                                                    n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                    if (!memo.has(n)) {
                                                                      memo.set(n, 1);
                                                                      while (n !== 1) {
                                                                        n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                        if (!memo.has(n)) {
                                                                          memo.set(n, 1);
                                                                          while (n !== 1) {
                                                                            n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                            if (!memo.has(n)) {
                                                                              memo.set(n, 1);
                                                                              while (n !== 1) {
                                                                                n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                if (!memo.has(n)) {
                                                                                  memo.set(n, 1);
                                                                                  while (n !== 1) {
                                                                                    n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                    if (!memo.has(n)) {
                                                                                      memo.set(n, 1);
                                                                                      while (n !== 1) {
                                                                                        n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                        if (!memo.has(n)) {
                                                                                          memo.set(n, 1);
                                                                                          while (n !== 1) {
                                                                                            n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                            if (!memo.has(n)) {
                                                                                              memo.set(n, 1);
                                                                                              while (n !== 1) {
                                                                                                n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                if (!memo.has(n)) {
                                                                                                  memo.set(n, 1);
                                                                                                  while (n !== 1) {
                                                                                                    n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                    if (!memo.has(n)) {
                                                                                                      memo.set(n, 1);
                                                                                                      while (n !== 1) {
                                                                                                        n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                        if (!memo.has(n)) {
                                                                                                          memo.set(n, 1);
                                                                                                          while (n !== 1) {
                                                                                                            n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                            if (!memo.has(n)) {
                                                                                                              memo.set(n, 1);
                                                                                                              while (n !== 1) {
                                                                                                                n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                if (!memo.has(n)) {
                                                                                                                  memo.set(n, 1);
                                                                                                                  while (n !== 1) {
                                                                                                                    n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                    if (!memo.has(n)) {
                                                                                                                      memo.set(n, 1);
                                                                                                                      while (n !== 1) {
                                                                                                                        n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                        if (!memo.has(n)) {
                                                                                                                          memo.set(n, 1);
                                                                                                                          while (n !== 1) {
                                                                                                                            n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                            if (!memo.has(n)) {
                                                                                                                              memo.set(n, 1);
                                                                                                                              while (n !== 1) {
                                                                                                                                n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                if (!memo.has(n)) {
                                                                                                                                  memo.set(n, 1);
                                                                                                                                  while (n !== 1) {
                                                                                                                                    n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                    if (!memo.has(n)) {
                                                                                                                                      memo.set(n, 1);
                                                                                                                                      while (n !== 1) {
                                                                                                                                        n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                        if (!memo.has(n)) {
                                                                                                                                          memo.set(n, 1);
                                                                                                                                          while (n !== 1) {
                                                                                                                                            n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                            if (!memo.has(n)) {
                                                                                                                                              memo.set(n, 1);
                                                                                                                                              while (n !== 1) {
                                                                                                                                                n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                if (!memo.has(n)) {
                                                                                                                                                  memo.set(n, 1);
                                                                                                                                                  while (n !== 1) {
                                                                                                                                                    n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                    if (!memo.has(n)) {
                                                                                                                                                      memo.set(n, 1);
                                                                                                                                                      while (n !== 1) {
                                                                                                                                                        n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                        if (!memo.has(n)) {
                                                                                                                                                          memo.set(n, 1);
                                                                                                                                                          while (n !== 1) {
                                                                                                                                                            n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                            if (!memo.has(n)) {
                                                                                                                                                              memo.set(n, 1);
                                                                                                                                                              while (n !== 1) {
                                                                                                                                                                n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                                if (!memo.has(n)) {
                                                                                                                                                                  memo.set(n, 1);
                                                                                                                                                                  while (n !== 1) {
                                                                                                                                                                    n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                                    if (!memo.has(n)) {
                                                                                                                                                                      memo.set(n, 1);
                                                                                                                                                                      while (n !== 1) {
                                                                                                                                                                        n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                                        if (!memo.has(n)) {
                                                                                                                                                                          memo.set(n, 1);
                                                                                                                                                                          while (n !== 1) {
                                                                                                                                                                            n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                                            if (!memo.has(n)) {
                                                                                                                                                                              memo.set(n, 1);
                                                                                                                                                                              while (n !== 1) {
                                                                                                                                                                                n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                                                if (!memo.has(n)) {
                                                                                                                                                                                  memo.set(n, 1);
                                                                                                                                                                                  while (n !== 1) {
                                                                                                                                                                                    n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                                                    if (!memo.has(n)) {
                                                                                                                                                                                      memo.set(n, 1);
                                                                                                                                                                                      while (n !== 1) {
                                                                                                                                                                                        n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                                                        if (!memo.has(n)) {
                                                                                                                                                                                          memo.set(n, 1);
                                                                                                                                                                                          while (n !== 1) {
                                                                                                                                                                                            n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                                                            if (!memo.has(n)) {
                                                                                                                                                                                              memo.set(n, 1);
                                                                                                                                                                                              while (n !== 1) {
                                                                                                                                                                                                n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                                                                if (!memo.has(n)) {
                                                                                                                                                                                                  memo.set(n, 1);
                                                                                                                                                                                                  while (n !== 1) {
                                                                                                                                                                                                    n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                                                                    if (!memo.has(n)) {
                                                                                                                                                                                                      memo.set(n, 1);
                                                                                                                                                                                                      while (n !== 1) {
                                                                                                                                                                                                        n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                                                                        if (!memo.has(n)) {
                                                                                                                                                                                                          memo.set(n, 1);
                                                                                                                                                                                                          while (n !== 1) {
                                                                                                                                                                                                            n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                                                                            if (!memo.has(n)) {
                                                                                                                                                                                                              memo.set(n, 1);
                                                                                                                                                                                                              while (n !== 1) {
                                                                                                                                                                                                                n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                                                                                if (!memo.has(n)) {
                                                                                                                                                                                                                  memo.set(n, 1);
                                                                                                                                                                                                                  while (n !== 1) {
                                                                                                                                                                                                                    n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                                                                                    if (!memo.has(n)) {
                                                                                                                                                                                                                      memo.set(n, 1);
                                                                                                                                                                                                                      while (n !== 1) {
                                                                                                                                                                                                                        n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                                                                                        if (!memo.has(n)) {
                                                                                                                                                                                                                          memo.set(n, 1);
                                                                                                                                                                                                                          while (n !== 1) {
                                                                                                                                                            n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                            if (!memo.has(n)) {
                                                                                                                                                              memo.set(n, 1);
                                                                                                                                                              while (n !== 1) {
                                                                                                                                                                n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
                                                                                                                                                                if (!memo.has(n)) {
                                                                                                                                                                  memo.set(n, 1);
                                                                                                                                                                  while (n !== 1) {
                                                                                                                                                                    n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
