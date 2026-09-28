import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        if (!scanner.hasNextLine()) {
            return;
        }

        // 1行目: 続く整数の個数
        if (!scanner.hasNextLine()) {
            return;
        }
        String line1 = scanner.nextLine();
        int expectedCount = 0;
        try {
            expectedCount = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は処理を終了（仕様上は想定されないが堅牢性のため）
            return;
        }

        long sum = 0;
        int actualCount = 0;

        // 2行目以降を読み取り、整数を処理する
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                long number = Long.parseLong(line);
                sum += number;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
                continue;
            }
        }

        // 仕様では「実際に読み取れた整数だけ」を対象とする。
        // 1行目の値は参考情報として使用せず、読み取れたものの個数と合計を出力する。
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
