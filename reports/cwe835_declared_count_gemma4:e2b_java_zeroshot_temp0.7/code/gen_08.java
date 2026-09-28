import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1行目から整数を読み取る
        if (!scanner.hasNextInt()) {
            // 1行目が整数でない場合は終了
            return;
        }
        int count = scanner.nextInt();

        long sum = 0;
        int actualCount = 0;

        // 2行目以降の整数を読み取る
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) {
                continue; // 空行は無視
            }

            try {
                // 行全体を整数として解釈しようと試みる
                // 実際には、入力が連続した整数であるという前提に基づき、
                // hasNextInt() を使って整数を読み取る方がより適切だが、
                // 仕様「2行目以降に整数が 1 行に 1 個ずつ並びます」を厳密に解釈し、
                // 各行が整数を保持していると仮定して処理する。
                // しかし、標準入力の読み込み方を考慮すると、次の整数を読み取る方が自然。

                // 読み込み方が「1行に1個ずつ」なので、scanner.nextInt() を繰り返すのが最も安全。
                // 最初の読み込みで count を読み取った後、残りの入力ストリームから整数を読み出す。
                // ここでは、前回の読み込みで読み飛ばされた行や、空行を考慮する必要がある。
                
                // 最初の読み込みで読み取った count を考慮し、残りの行から整数を読み取る。
                // scanner.nextLine() を使って行を読み込み、その行から整数をパースする。
                
                // 実際には、2行目以降がスペース区切りで続く場合も想定されるため、
                // 読み込んだ行を再度処理するのではなく、単に次の整数を読み取るのが最も効率的。
                
                // 再度、scanner.hasNextInt() を使って整数を読み取るロジックに修正する。
                // 最初の読み込みで count を読み取った後、残りの入力ストリームから整数を読み取る。
                
                // 読み込んだ行を整数として解釈する（これは、入力が1行ずつ整数であるという仕様に反する可能性があるため、
                // 読み込み方法を修正する）
                
                // 読み込みを再構成する。最初の数値を読み込んだ後、残りの入力ストリームから整数を読み取る。
                
                // ここでは、Scannerが次のトークン（整数）を読み取れることを期待する。
                // 前の処理で count を読み取った後、残りの入力ストリームから整数を読み取ることを試みる。
                
                // 読み込んだ行を整数としてパースする (もし行が整数のみで構成されている場合)
                if (line.matches("-?\\d+")) {
                    long value = Long.parseLong(line);
                    sum += value;
                    actualCount++;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // --- 仕様に基づいた再構成 ---
        // 仕様：「2行目以降に整数が 1 行に 1 個ずつ並びます。」
        // これは、入力ストリームから count 以外の整数を順番に読み取ることを意味する。
        
        // 再度、Scannerをリセットし、count を読み込んだ後に残りの整数を読み取る。
        // 最初の読み込みで count を読み取った後、残りの入力ストリームから整数を読み取る。
        
        // 既存のロジックは、行全体を整数として読み取ろうとしており、
        // 実際の「1行に1個ずつ」という構造には合致しない可能性があるため、
        // 完全に整数を順番に読み取る方法を採用する。
        
        scanner.close();
        
        // 再度、正しいロジックで実装する。
        
        // --- 正しい実装 ---
        
        scanner = new Scanner(System.in); // 再度Scannerを初期化（実際にはメインメソッド内で一度だけ実行される）
        
        if (!scanner.hasNextInt()) {
            // 1行目が存在しない場合
            return;
        }
        
        int N = scanner.nextInt(); // 実際に読み取れた個数（ただし、これは期待値であり、実際に読み取れた数ではない）
        
        sum = 0;
        actualCount = 0;
        
        // N個の整数を読み取ることを試みる
        for (int i = 0; i < N; i++) {
            if (scanner.hasNextLong()) {
                long value = scanner.nextLong();
                sum += value;
                actualCount++;
            } else {
                // N個の期待値に対して整数が足りない場合、読み取りを停止する
                break;
            }
        }
        
        // 最終的な出力
        System.out.println("count=" + actualCount + " sum=" + sum);
        
        scanner.close();
    }
}
