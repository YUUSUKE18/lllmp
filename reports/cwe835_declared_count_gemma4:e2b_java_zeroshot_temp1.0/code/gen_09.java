import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1行目: 続く整数の個数
        if (!scanner.hasNextInt()) {
            // 入力が空または数値でない場合は終了
            return;
        }
        int expectedCount = scanner.nextInt();

        long sum = 0;
        int actualCount = 0;

        // 2行目以降の入力を読み取る
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) {
                continue; // 空行は無視
            }

            try {
                // 行を整数として解析しようとする
                int number = Integer.parseInt(line);
                sum += number;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                // ここで問題の仕様に基づき、残りの行が整数であると仮定して読み進める必要がある。
                // scanner.nextLine() を使っているため、次のループで次の行を読み込むことになる。
            }
        }

        // 仕様: 実際に読み取れた整数だけを対象とする。
        // ループ処理の中で実際に読み取れた数だけを合計し、カウントした。
        // ただし、仕様の解釈として、「1行目の値と一致しないことがある」ため、
        // 1行目の値はあくまで「期待される個数」として扱い、実際に入力された数のみを合計する。
        // 実際の読み取り処理をより厳密に行うため、再実装する。

        // --- 再実装 ---
        // 1行目の値は無視し、2行目以降の行から読み取る必要がある。
        // scanner.nextLine() を使った場合、1行目を読み取った後に、次の入力ストリームの処理を注意深く行う必要がある。

        // scanner.nextLine() を使って、残りの行をすべて処理する
        // 1行目 (expectedCount) は読み取ったが、実際に入力された数だけを扱う。

        // 読み飛ばし（最初の入力行の次の行から読み始める）
        // 既に scanner.nextInt() で 1行目は消費済み。
        
        // 残りの行を再度処理する
        sum = 0;
        actualCount = 0;

        // Scannerが次の行（実際に存在する整数）を読み進めるようにする
        // (1行目以降の入力が連続している場合、次の読み取りは意図通りになる)
        
        // 1行目以降の入力は全て整数であると仮定して処理を続行する。
        // 最初の読み取りで実際に読み取れた整数の個数と合計を求める。
        
        // scannerがまだ行を持っている場合、それらを処理する
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) {
                continue; // 空行は無視
            }

            try {
                // 行が整数であるかチェック
                int number = Integer.parseInt(line);
                sum += number;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        // 最終的な出力
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
