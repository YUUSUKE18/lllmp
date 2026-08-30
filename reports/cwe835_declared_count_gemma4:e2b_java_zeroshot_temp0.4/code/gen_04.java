import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1行目を読み取る（続く整数の個数）
        if (!scanner.hasNextInt()) {
            // 入力が存在しない場合は終了
            return;
        }
        int expectedCount = scanner.nextInt();

        long sum = 0;
        int actualCount = 0;

        // 2行目以降を読み取り、整数として処理する
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                // 行から整数を読み取る
                // nextLine()で読み取った行から整数をパースする
                // 実際には、Scannerの次のトークンとして整数を読み取る方が安全だが、
                // 仕様に従い、読み取った行を処理する。
                // ここでは、Scannerが次のトークンを読み取るように調整する。
                // 1行目に個数が与えられた後、残りの入力は整数が続く。
                
                // Scannerが次の整数を読み取ることを期待する。
                // 1行目に個数が与えられた後、残りの入力は整数が続く。
                // 読み取りのロジックを再調整する。
                
                // 1行目以降の入力は、改行区切りで整数が続くことを想定する。
                // Scannerの次のトークンが整数であることを確認する。
                
                // 既にexpectedCountを読み取ったので、残りの入力から整数を読み取る。
                // 以下のループは、残りの入力ストリームから整数を読み取ることを試みる。
                
                // 実際には、scanner.nextInt()やscanner.nextLong()をループ内で使う方が自然だが、
                // 仕様では「2行目以降に整数が1行に1個ずつ並びます」とあるため、
                // Scannerが次の行を読み込む動作に依存する。
                
                // 読み取った行を整数として解釈する試み
                long number = Long.parseLong(line);
                sum += number;
                actualCount++;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
                // この場合、Scannerが次の行に進むため、次のループへ進む。
            }
        }
        
        // 厳密には、Scannerが次の整数を読み取るように、
        // 1行目以降の入力ストリームを再評価する必要がある。
        // 標準入力の構造を考慮すると、Scannerが自動的に次のトークンを読み進めるため、
        // 以下のロジックで十分であると判断する。

        // 最終的な出力
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
