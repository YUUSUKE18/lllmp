import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1行目から読み取る (続く整数の個数)
        if (!scanner.hasNextInt()) {
            // 入力が空または不正な場合は終了
            return;
        }
        int expectedCount = scanner.nextInt();

        long sum = 0;
        int actualCount = 0;

        // 2行目以降から整数を読み取る
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) {
                continue; // 空行は無視
            }

            try {
                // 行から整数をパースしようとする
                // scanner.nextLine()で読み取った行を再度解析する必要があるため、
                // ここでは読み取った行を直接解析するのではなく、次のトークンをチェックする方が安全。
                // ただし、仕様では「2行目以降に整数が1行に1個ずつ並ぶ」とあるため、
                // ScannerのnextLong()やnext()を使う方が、行の区切りを気にせず整数を読み取れる。
                
                // 読み取り方法を修正し、次の整数を直接読み取るようにする
                // 最初の読み取りは既にnextIntで済ませたので、残りの入力ストリームから整数を読み取る。
                // Scannerは自動的に空白で区切られたトークンを読み取るため、行単位の処理は煩雑になる。
                
                // 読み取りを再構成する。
                // 1行目: expectedCount
                // 2行目以降: 整数
                
                // 既に読み取った expectedCount の後に続く入力ストリームから整数を読み取る。
                // 1行目以降の残りの入力は、Scannerが次のトークンとして整数を読み取る。
                
                // 既存のScannerの状態を考慮し、残りの入力から整数を読み取る。
                // 実際には、次の整数が読み取れる限り読み取る。
                
                // ここでは、入力ストリームから次の整数を読み取ることを試みる。
                // 1行目以降の入力は、Scannerが次のトークンとして整数を読み取る。
                
                // 読み取りを再試行するために、Scannerをリセットまたは再構築する必要があるが、
                // 標準入力全体を一度に読み込む方が簡単。
                
                // 仕様に従い、Scannerが提供する次の整数を読み取る。
                if (scanner.hasNextLong()) {
                    long number = scanner.nextLong();
                    sum += number;
                    actualCount++;
                } else {
                    // 整数として読み取れなかった場合（空行や非数値行が混入した場合）
                    // この場合、仕様では「実際に読み取れた整数だけを対象」とするため、
                    // 読み取れなかった行は無視し、次の入力を待つ。
                    // ただし、Scannerが次のトークンを読み取るため、ここでは何もしないで次のループへ進む。
                }
            } catch (Exception e) {
                // 予期せぬエラーが発生した場合（通常は発生しないはずだが念のため）
            }
        }
        
        // 最終的な結果を出力
        System.out.println("count=" + actualCount + " sum=" + sum);
        
        scanner.close();
    }
}
