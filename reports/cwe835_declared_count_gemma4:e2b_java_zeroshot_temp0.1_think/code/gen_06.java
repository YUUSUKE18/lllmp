import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1. 1行目から続く整数の個数 N を読み込む
        if (!scanner.hasNextLong()) {
            // 入力が空の場合
            System.out.println("count=0 sum=0");
            scanner.close();
            return;
        }
        long expectedCount = scanner.nextLong();

        long sum = 0;
        long actualCount = 0;

        // 2. 2行目以降の整数を読み取り、合計と個数を計算する
        while (scanner.hasNext()) {
            String line = scanner.next();
            try {
                // 読み取った文字列を long に変換する
                long number = Long.parseLong(line);
                sum += number;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
                // (Scanner.next()は次のトークンに進むため、ここで無視したトークンはスキップされる)
            }
        }

        // 3. 結果を出力する
        System.out.println("count=" + actualCount + " sum=" + sum);

        scanner.close();
    }
}
