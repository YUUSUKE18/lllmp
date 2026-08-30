import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        String[] parts = line.split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を無視して整数として解釈できるか試みる
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 整数が一つもなかった場合（仕様上、空の入力や非数値のみの場合）
            // このケースの具体的な出力要件は明記されていないが、要素数と最大値が存在しないため、
            // 0個と最小値（または適切なデフォルト値）を出力するか、何も出力しないか判断が必要。
            // ここでは、読み取れた有効な数値がない場合は、count=0, max=0 または count=0, max=Long.MIN_VALUE (初期値) となるが、
            // 厳密には「要素数と最大値を求める」という操作が実行されなかったため、ここでは何も出力しないか、
            // 最も安全な解釈として、読み取れた数値がない場合は何も出力しないとする。
            // ただし、もし入力が空だった場合、count=0, max=0 とするのが自然かもしれない。
            // 仕様に従い、実際に数値を読み取った場合にのみ出力する。
        }

        scanner.close();
    }
}
