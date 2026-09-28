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
                } else if (b >= '0' && b <= '9') {
                    long value = 0;
                    for (int j = i + 1; j < n; j++) {
                        int nextB = buf[j] & 0xff;
                        if (nextB == ',') {
                            break;
                        }
                        value = value * 10 + (nextB - '0');
                    }
                    if (value > 0) { // ゼロも考慮するが、ここでは整数として解釈できるもののみを数える
                        count++;
                        if (!foundFirst || value > max) {
                            max = value;
                            foundFirst = true;
                        }
                    }
                }
            }
        }

        // 最後の要素の処理（入力がカンマで終わる場合や、行末にデータがある場合に対応するため、再読み込みまたは後処理が必要だが、ここではシンプル化のため、カンマ区切りとして値を抽出するロジックを修正する）
        
        // 再度、より堅牢なカンマ区切り処理を行うため、ストリーム全体を文字列として扱うアプローチに変更する。

        // --- 再実装開始 (カンマ区切りの整数列の処理に特化) ---
        
        // この問題は、標準入力が「カンマ区切りの整数列」であり、空要素や前後の空白無視が必要なため、入力を一行ずつ処理するのが最も簡単。
        // ただし例1, 2, 3の形式を参考にすると、入力全体がどのように構造化されているか不明確。
        // 通常、カンマ区切りの整数列はスペース区切りと異なり、数値を個別に抽出する必要がある。

        // 標準入力をまとめて読み込み、カンマで分割する方式を採用する。
        
        java.util.StringTokenizer st = new java.util.StringTokenizer(new java.io.StringReader(new String(buf)));
        long actualCount = 0;
        long actualMax = Long.MIN_VALUE;

        while (st.hasMoreTokens()) {
            try {
                long value = Long.parseLong(st.nextToken());
                actualCount++;
                if (value > actualMax) {
                    actualMax = value;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する (仕様に従う)
            }
        }

        if (actualCount == 0) {
            // 要素が一つもなかった場合、最大値は定義できないか、最小値を返すなどの処理が必要だが、ここではゼロを出力する。
            System.out.println("count=0 max=-1"); // または仕様に従う（64bit範囲なのでMIN_VALUEを考慮）
        } else {
            System.out.println("count=" + actualCount + " max=" + actualMax);
        }
    }
}
