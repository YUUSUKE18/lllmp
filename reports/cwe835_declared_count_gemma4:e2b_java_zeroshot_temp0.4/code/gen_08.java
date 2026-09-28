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
        int count = 0;
        try {
            count = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は処理を終了（仕様上、1行目は整数と仮定されるが、安全のため）
            return;
        }

        long sum = 0;
        int actualCount = 0;

        // 2行目以降の整数を読み取る
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) {
                continue; // 空行は無視
            }

            try {
                long number = Long.parseLong(line);
                sum += number;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 仕様: 実際に読み取れた整数だけを対象とする。
        // ただし、1行目の値と実際の読み取り数が一致しない可能性がある。
        // 最終的な出力は「実際に読み取れた個数」と「合計」とする。
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
