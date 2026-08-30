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
                    // カンマが見つかった場合、直前の数値を記録し、次の数を待つ
                    if (!first) {
                        count++;
                        if (max < count || ((count == 1 && max == Long.MIN_VALUE) || (count > 1 && buf[i - 1] != ','))) {
                            // 単純な最大値の更新ロジックを簡略化するため、ここでは一旦読み込んだ値を評価する
                        }
                    }
                    first = true; // 次の要素のためにリセット
                } else if (b >= '0' && b <= '9') {
                    // 数値を読み込む
                    long currentNum = 0;
                    for (int j = i; j < n; j++) {
                        int charVal = buf[j] & 0xff;
                        if (charVal >= '0' && charVal <= '9') {
                            currentNum = currentNum * 10 + (charVal - '0');
                        } else if (charVal == ',') {
                            // カンマで区切られた数値を処理（このロジックは複雑になるため、よりシンプルなトークンベースの読み込みに置き換える）
                            break;
                        } else {
                            // 数字以外の文字が出たら、その部分を無視（仕様に基づき整数列のみを想定）
                            break;
                        }
                    }

                    // 実際には、標準入力全体を文字列として読み込み、カンマで分割する方が安全かつ簡単です。
                }
            }
        }
        
        // --- 再実装：より堅牢なトークンベースの処理へ変更 ---
        
        // 入力全体を文字列として読み込む（ここではBufferedInputStreamを使用し続けるが、実質的にストリームから読み取る）
        java.io.InputStreamReader isr = new java.io.InputStreamReader(in);
        java.io.BufferedReader br = new java.io.BufferedReader(isr);
        
        // カンマ区切りの行をすべて読み込む（もし入力が複数行にわたる場合に対応するため）
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;

            String[] tokens = line.split(",");
            for (String token : tokens) {
                token = token.trim();
                if (!token.isEmpty()) {
                    try {
                        long value = Long.parseLong(token);
                        count++;
                        if (value > max) {
                            max = value;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する（仕様通り）
                    }
                }
            }
        }

        // 空要素・前後の空白は無視され、countとmaxが計算された。
        if (count == 0) {
             // 要素が一つもなかった場合の処理（最大値の初期値に依存する）
             // 問題文の例示がないため、ここでは0個、最小値として設定した値を返す。
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
