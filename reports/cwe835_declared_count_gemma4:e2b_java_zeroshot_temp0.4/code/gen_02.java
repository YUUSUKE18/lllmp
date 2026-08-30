import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1行目を読み取る（整数の個数）
        if (!scanner.hasNextInt()) {
            // 入力が空または不正な場合は終了
            return;
        }
        int expectedCount = scanner.nextInt();

        long sum = 0;
        int actualCount = 0;

        // 2行目以降を読み取り、整数として処理する
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) {
                continue; // 空行は無視
            }

            try {
                // 行全体を整数として解釈しようとする（仕様上、1行に1個ずつ並ぶため、次のトークンを読み取る方が自然だが、
                // 厳密に「行」を読み取るという指示に従う）
                // ここでは、次の行から整数を読み取る方が、入力形式（2行目以降に整数が1行に1個ずつ並ぶ）に合致する。
                // 読み取り方を修正し、次のトークンを読み取るようにする。
                // Scannerのnext()は空白区切りで読み取るため、行単位の処理を避ける。
                // 仕様の「2行目以降に整数が 1 行に 1 個ずつ並びます」を考慮し、次の整数を読み取る。
                
                // Scannerのnext()を再利用する（次のトークンを読み取る）
                if (scanner.hasNextLong()) {
                    long number = scanner.nextLong();
                    sum += number;
                    actualCount++;
                } else {
                    // 整数として読み取れなかった場合（空行や非数値行が混入している場合）
                    // この場合、次の行に進む必要がある。
                    // Scannerが次の行の読み取りを待つため、ここでは何もしない。
                    // ただし、もし次の行が整数でない場合、それは無視されるべき。
                }
            } catch (Exception e) {
                // 予期せぬエラーが発生した場合も無視
            }
        }

        // 最終結果を出力
        System.out.println("count=" + actualCount + " sum=" + sum);
        
        scanner.close();
    }
}
