import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1. 最初の行（期待される個数 N）を読み込む
        if (!scanner.hasNextLong()) {
            // 入力が空の場合は終了
            System.out.println("count=0 sum=0");
            scanner.close();
            return;
        }
        
        // 期待される個数 N を読み込むが、実際の処理では読み取った整数のみを対象とする
        long expectedCount = scanner.nextLong();

        long actualCount = 0;
        long sum = 0;

        // 2. 2行目以降の整数を読み取り、カウントと合計を計算する
        // hasNextLong() を使用することで、整数として解釈できない行や空行を自動的に無視する
        while (scanner.hasNextLong()) {
            long number = scanner.nextLong();
            actualCount++;
            sum += number;
        }

        // 3. 結果を出力する
        System.out.println("count=" + actualCount + " sum=" + sum);

        scanner.close();
    }
}
