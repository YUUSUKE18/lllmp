import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=-1"); // または適切な初期値。ここでは要素がないと仮定して0個、最大値を-1とするか、問題の制約に従う
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を無視して整数として解釈できるか試みる
            try {
                // トークナイザを使って、部分文字列から整数を抽出する（カンマ区切りなのでsplitで分けた要素は数値のみと期待されるが、安全のため）
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) continue;

                long value = Long.parseLong(trimmedPart);
                count++;
                if (value > maxVal) {
                    maxVal = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        if (!foundNumber) {
            // 整数が一つもなかった場合
            System.out.println("count=0 max=-1"); // または問題の制約に従う。ここでは、値がない場合は最大値を定義しにくいので注意が必要。与えられた例にはこのケースの指示がないため、安全策として0個と最小値を設定する。
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
