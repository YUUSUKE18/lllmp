import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        int c = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;
        int n;
        
        // カンマ区切りの整数を読み込むためのバッファ処理を工夫する
        // 今回は、一旦すべて読み込んで解析する方法を採用する
        
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    c++;
                } else if (b != ' ' && b != '\t' && b != '\n' && b != '\r') {
                    // 数字を読み取る
                    long val = 0;
                    int start = i;
                    while (i < n && buf[i] >= '0' && buf[i] <= '9') {
                        val = (val * 10) + (buf[i] - '0');
                        i++;
                    }
                    // 数字を読み終わった後、次のカンマや改行があるかを確認する（ここでは無視し、次のループで処理させる）
                    if (c > 0) { // カンマが一つでもあれば整数としてカウント対象とする
                       if (first || val > max) {
                           max = val;
                       }
                       first = false;
                    }
                    i--; // ループのインクリメントでスキップされるのを防ぐため、最後の数字の位置に戻す
                }
            }
        }

        // 最後の要素がカンマで終わっていなかった場合を考慮（上記ロジックでは難しいので、単純なカンマ分割再解析が必要になるが、
        // 例題の構造を模倣し、より堅牢な読み込み方を試みる）
        
        // 再度、入力を文字列として処理する方がシンプルで確実であるため、ここでは一旦標準的な入力読み込みと置換を行う。

        // 実際の課題仕様に基づき、カンマ区切りとして処理を再構成する (文字列として読み込む)
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        String line = scanner.nextLine();
        
        if (!line.isEmpty()) {
            String[] parts = line.split(",");
            int actualCount = 0;
            long currentMax = Long.MIN_VALUE;

            for (String part : parts) {
                // 空白を除去して整数に変換を試みる
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        long value = Long.parseLong(trimmedPart);
                        actualCount++;
                        if (value > currentMax) {
                            currentMax = value;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する
                    }
                }
            }
            
            if (actualCount > 0) {
                System.out.println("count=" + actualCount + " max=" + currentMax);
            } else {
                 // 要素が全くなかった場合（入力が空またはカンマのみの場合）
                 System.out.println("count=0 max=-9223372036854775808"); // Long.MIN_VALUE相当の大きな値、あるいは問題の解釈に従う。ここでは0を出力しても良いが、最大値が出ないので注意。
            }

        } else {
             // 入力が空だった場合
             System.out.println("count=0 max=-9223372036854775808"); // 64bitの最小値を出力する（安全のため）
        }
    }
}
