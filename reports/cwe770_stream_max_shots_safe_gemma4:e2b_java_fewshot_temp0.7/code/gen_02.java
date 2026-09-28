import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    if (first) {
                        // 空の要素が連続する場合や、カンマのみの場合を考慮し、カウントは行わない
                        first = false;
                    }
                } else if (b >= '0' && b <= '9') {
                    long currentVal = 0;
                    for (int j = i; j < n; j++) {
                        int cb = buf[j] & 0xff;
                        if (cb == ',') {
                            // 整数が確定した
                            if (count > 0) {
                                if (currentVal > max) {
                                    max = currentVal;
                                }
                            }
                            count++;
                            currentVal = 0; // 次の数値をリセット
                        } else if (cb == ' ' || cb == '\t' || cb == '\n' || cb == '\r') {
                            // 空白文字は無視（次の数値が来るまでスキップ）
                        } else {
                            currentVal = currentVal * 10 + (cb - '0');
                        }
                    }
                    // ループ終了後の残りの数値処理（最後の要素の場合など）
                    if (currentVal > 0 || (n == i && buf[i] >= '0' && buf[i] <= '9')) {
                         if (count > 0) {
                            if (currentVal > max) {
                                max = currentVal;
                            }
                        } else if (count == 0) {
                             // カンマで区切られた最後の要素の場合、または全ての要素が数値だった場合
                             count = 1;
                             max = currentVal;
                        }
                    }

                }
            }
        }

        // 最後の要素の処理（入力の終わりでカンマがない場合）
        if (count == 0) {
             // カンマで区切られたリストが一つもなかったか、または全て空だった場合の処理を調整する必要があるが、
             // シンプルにカンマで区切られた整数列として扱うため、入力の終わりでの処理を再考する。

             // 再度、よりシンプルな分割処理を採用する（例2と同様のロジックを応用）
        }


        // --- 再実装：単純なトークン化アプローチ ---
        count = 0;
        max = Long.MIN_VALUE;
        boolean foundFirst = false;

        String content = new String(buf);
        if (content.isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            return;
        }

        // 入力を文字列として処理し、カンマで分割する方が安全
        String[] tokens = content.split(",\\s*");

        for (String token : tokens) {
            if (!token.trim().isEmpty()) {
                try {
                    long val = Long.parseLong(token.trim());
                    count++;
                    if (val > max) {
                        max = val;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視（仕様通り）
                }
            }
        }

        if (count == 0) {
             System.out.println("count=0 max=" + Long.MIN_VALUE); // count=0の場合のmax設定を考慮
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
