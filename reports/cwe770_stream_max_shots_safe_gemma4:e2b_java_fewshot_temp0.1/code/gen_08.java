import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    count++;
                } else if (b != ' ' && b != '\t' && b != '\n' && b != '\r') {
                    try {
                        long val = Long.parseLong(new String(buf, i, 1));
                        if (!foundFirst || val > max) {
                            max = val;
                            foundFirst = true;
                        }
                    } catch (NumberFormatException e) {
                        // Ignore elements that are not valid integers
                    }
                }
            }
        }

        // 最後の要素の処理（カンマで終わっていない場合）
        if (n > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;
                if (b != ',' && b != ' ' && b != '\t' && b != '\n' && b != '\r') {
                    try {
                        long val = Long.parseLong(new String(buf, i, 1));
                        if (!foundFirst || val > max) {
                            max = val;
                            foundFirst = true;
                        }
                    } catch (NumberFormatException e) {
                        // Ignore elements that are not valid integers
                    }
                }
            }
        }

        // カウントの調整：カンマの数ではなく、有効な数値の数をカウントする
        // 再度読み込み、よりロバストに処理する（例1, 2のパターンを参考に）

        // シンプル化のため、入力全体を文字列として扱い、カンマで分割するアプローチを採用する。
        // 標準入力から全て読み込む方法が複雑なため、ここでは標準的なストリーム操作で再実装する。

        // 再度、よりシンプルなロジックで処理を行う（例2の構造に近づける）
        count = 0;
        max = Long.MIN_VALUE;
        boolean isFirst = true;
        long currentNumber = 0;
        boolean inNumber = false;

        // 入力を全て読み込むためのバッファリングを再利用する
        in.reset(); // ストリームの先頭に戻す（実際にはファイルや標準入力がリセットされないため、ここでは再読込が必要だが、JavaのBufferedInputStreamはポインタ移動が困難なため、今回はストリーム全体を一度に読み込む前提で処理を修正する）

        // 実際の入力を全て読み込み、文字列として処理する方が安全
        java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(System.in));
        String line;
        StringBuilder allInput = new StringBuilder();
        while ((line = reader.readLine()) != null) {
            allInput.append(line).append("\n");
        }

        String[] parts = allInput.toString().trim().split("\\s*,\\s*");

        // フィルタリングと計算
        for (String part : parts) {
            if (!part.isEmpty()) {
                try {
                    long val = Long.parseLong(part);
                    count++;
                    if (val > max) {
                        max = val;
                    }
                } catch (NumberFormatException e) {
                    // 無効な要素は無視
                }
            }
        }

        // 最終的な出力
        System.out.println("count=" + count + " max=" + max);
    }
}
