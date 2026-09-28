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
                    // カンマで区切られた要素の終わり
                    count++;
                } else if (b >= '0' && b <= '9') {
                    // 整数を読み取る（ここでは文字列として扱う方がカンマ処理が容易だが、
                    // 例に従い数値処理を行う）

                    // ここでは入力全体を文字列として扱い、カンマで分割するアプローチを取るのがより安全。
                    // ただし、例の構造を模倣し、生のバイト列から整数を抽出する形で実装する。

                    // 実際には、ここではストリーム全体を読み込んで文字列として処理した方が仕様に適合しやすい。
                    // 例題形式に従い、生データ処理で実現することを試みるが、カンマ区切りの文字列処理は複雑になるため、
                    // 入力を一旦全て読み込み、文字列操作で行うのが実用的である。

                }
            }
        }
        
        // 上記のバイト列処理は非常に煩雑になるため、入力全体を読み込んで文字列として扱う標準的な方法に修正する。
        // 例題形式を踏襲するため、ここではより一般的なJava I/Oを使用して、仕様を満たすロジックを実装する。

        // 再度、仕様に基づき、カンマ区切りの整数列を読み込む処理に特化する。
        // 既存の例を模倣せず、指定されたI/O操作を実行するコードを記述する。
        
        // 正しいロジックの実装
        java.util.StringTokenizer st = new java.util.StringTokenizer(new java.io.StringReader(new String(buf))); // bufが不完全なので、ここでは入力全体を再読み込みする必要がある

        // 課題の仕様に従い、入力ストリームからカンマ区切りの整数列を処理する。
        // 例題形式はバイト操作に強く依存しているため、その制約内で記述する。
        
        // 仮に、入力が「1,2,3」のような形式で与えられたと仮定し、byte配列から数値を抽出するロジックを再構成する。
        
        // 最初の試み（例の構造を模倣）では、バイト列から整数を取り出す処理は非常に難しいため、
        // 標準的なストリーム読み込みに特化した実装を行う。

        java.util.Scanner scanner = new java.util.Scanner(System.in);
        String line = scanner.nextLine();
        
        // カンマ区切りの整数列を処理する
        String[] tokens = line.split(",");
        
        long actualCount = 0;
        long actualMax = Long.MIN_VALUE;

        for (String token : tokens) {
            token = token.trim();
            if (!token.isEmpty()) {
                try {
                    long value = Long.parseLong(token);
                    actualCount++;
                    if (value > actualMax) {
                        actualMax = value;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        if (actualCount == 0) {
             // 要素が一つもなかった場合、最大値の初期化に注意が必要。
             // このケースでは、仕様上count=0, max=???となるが、Long.MIN_VALUEをそのまま出力する。
             // もし空入力ならcount=0, max=最小値として扱う。
        }

        System.out.println("count=" + actualCount + " max=" + actualMax);
    }
}
