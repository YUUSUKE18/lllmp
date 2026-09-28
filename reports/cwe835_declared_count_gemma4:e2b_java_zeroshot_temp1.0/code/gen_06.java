import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        if (!scanner.hasNextLine()) {
            // 入力が全くない場合
            System.out.println("count=0 sum=0");
            scanner.close();
            return;
        }

        // 1行目: 続く整数の個数
        if (!scanner.hasNextLine()) {
            // 1行目しかなく、それが個数として意味をなさない場合（あるいは何も続く情報がない場合）
            System.out.println("count=0 sum=0");
            scanner.close();
            return;
        }

        String line1 = scanner.nextLine().trim();
        if (line1.isEmpty()) {
            // 1行目が空の場合、処理終了
            System.out.println("count=0 sum=0");
            scanner.close();
            return;
        }

        int count;
        try {
            count = Integer.parseInt(line1);
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合、無視して終了（仕様上は1行目は整数と想定されるが安全のため）
            System.out.println("count=0 sum=0");
            scanner.close();
            return;
        }

        long sum = 0;
        int actualCount = 0;

        // 2行目以降の入力を処理
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) {
                continue; // 空行は無視
            }

            try {
                // 整数として解釈を試みる
                long number = Long.parseLong(line);
                sum += number;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                // 仕様: 整数として解釈できない行も無視する
            }
        }

        // 結果の出力
        System.out.println("count=" + actualCount + " sum=" + sum);

        scanner.close();
    }
}
