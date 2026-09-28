import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1. 1行目から期待される個数 N を読み取る
        if (!scanner.hasNextInt()) {
            // 入力が空の場合
            System.out.println("count=0 sum=0");
            scanner.close();
            return;
        }
        int expectedCount = scanner.nextInt();

        long sum = 0;
        int actualCount = 0;

        // 2. 2行目以降の整数を読み取り、合計と実際の個数を計算する
        // 読み取り可能なすべてのトークンを処理する
        while (scanner.hasNext()) {
            String line = scanner.nextLine().trim();
            
            if (line.isEmpty()) {
                // 空行は無視
                continue;
            }

            try {
                // 行から整数をパースする
                // Scannerのnext()や次の行を直接処理する方が、スペース区切りの入力に対応しやすいが、
                // ここでは行全体を読み込んでパースする方式を採用する。
                // ただし、仕様上は「1行に1個ずつ並ぶ」ため、次のトークンとして読み取る方が自然。
                
                // ScannerのnextLong()を使って、次の有効な整数を試みる
                if (scanner.hasNextLong()) {
                    long number = scanner.nextLong();
                    sum += number;
                    actualCount++;
                } else {
                    // hasNextLong()がfalseの場合、残りの入力が不正な形式である可能性がある
                    // この場合、残りの入力が無視されるようにループを継続する
                    // ただし、次の行を読み飛ばす必要があるため、次の行を読み込む処理が必要になる。
                    // Scannerの挙動を考慮し、ここでは次の行を読み飛ばす処理を試みる。
                    // 厳密には、次の行が整数でない場合、その行を無視し、次の有効な整数を探す必要がある。
                    // ScannerのnextLong()が失敗した場合、その行全体を無視する。
                    // ここでは、次の行を読み飛ばすために、次の行を読み込む処理を試みる。
                    // (Scannerの設計上、次の行を読み込む前に次のトークンを処理するのが一般的だが、
                    // 今回は入力が混在しているため、次の行を読み飛ばす処理を試みる)
                    
                    // hasNextLong()がfalseの場合、次の行を読み飛ばす
                    if (scanner.hasNextLine()) {
                        scanner.nextLine(); // 不正な行をスキップ
                    }
                }
            } catch (Exception e) {
                // パース中に予期せぬエラーが発生した場合も無視
                continue;
            }
        }

        // 3. 結果を出力する
        System.out.println("count=" + actualCount + " sum=" + sum);

        scanner.close();
    }
}
