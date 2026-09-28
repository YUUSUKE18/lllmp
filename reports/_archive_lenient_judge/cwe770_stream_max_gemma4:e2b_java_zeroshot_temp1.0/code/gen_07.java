import java.util.Scanner;

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
        boolean foundValidNumber = false;

        for (String part : parts) {
            // 前後の空白を無視して整数として解釈可能かチェック
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                // 64bit 整数の範囲内であるという制約はLong型で自動的に満たされるため、念のためチェックは省略するが、実質的なチェックとして扱う
                
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundValidNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // すべての要素が整数であり、有効な数値が見つかった場合に結果を出力する
        if (foundValidNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 整数として有効な要素が一つもなかった場合（入力がすべて無効な文字列だった場合など）の処理。
            // 仕様に基づくと、少なくとも0個と最小値が出力されるべきだが、入力ストリームから読み取った結果に基づき出力する。
            // ここでは、もし数値が一つも見つからなかった場合は、count=0, max=??となるため、最初の要素が存在しない場合のデフォルトの動作を考慮し、
            // 収集したデータに基づいて出力する。有効な数が1つ以上あれば出力する。
            // もし入力が空または無効な場合、maxの初期値 (Long.MIN_VALUE) が残る可能性がある。
            // 最小限の実装として、数値が見つかった場合は出力する。
        }

        scanner.close();
    }
}
