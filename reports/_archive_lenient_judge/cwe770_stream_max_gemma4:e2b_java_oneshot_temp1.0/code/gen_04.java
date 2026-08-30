import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=-1"); // 空入力の場合は count=0, max=-1 のように定義しても良いが、ここでは適切な値で処理を継続する。仕様に厳密に従い、データがない場合はどう扱うか不明なため、ここでは0個の要素と最大値として-1（または最小値）を仮定する。ただし、入力が空なら実質的に何も計算できないので、入力がない場合の挙動は問題文に明記されていないため、データが存在しないケースを考慮して0, -1とする。
            return;
        }

        String[] parts = line.split(",");
        if (parts.length == 0) {
             System.out.println("count=0 max=-1");
             return;
        }

        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) continue;

            try {
                long value = Long.parseLong(trimmedPart);
                count++;
                if (value > max) {
                    max = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        if (!foundNumber) {
            // 有効な整数が一つもなかった場合、count=0, max=-1 のように扱うか、仕様に合わせて調整が必要。
            // ここでは、数値が見つからなかった場合は count=0, maxを適切に設定する。
            System.out.println("count=0 max=-1"); // 数値がない場合のデフォルトとして-1を採用
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
