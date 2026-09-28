import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0L; // 要素数 (int に収まるが BigInteger で計算して long にキャストするか int 型で十分か確認が必要だが、仕様は 64bit 整数の範囲と言われているので long または BigInteger を考慮)
        long sum = 0L;  // 合計

        // 仕様に従って解析: "値:回数" の形をカンマ区切りで取得し、要素数と合計を計算
        if (line != null && line.trim().length() > 0) {
            String[] parts = line.split(",");
            for (String part : parts) {
                // 空要素・前後の空白は無視
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) continue;

                try {
                    // "値:回数" の形式から解析
                    int colonIndex = trimmedPart.indexOf(':');
                    if (colonIndex <= 0) continue; // : が存在しないか、初位置にある場合は無効

                    String valueStr = trimmedPart.substring(0, colonIndex).trim();
                    String countStr = trimmedPart.substring(colonIndex + 1).trim();

                    if (valueStr.isEmpty() || countStr.isEmpty()) continue;

                    BigInteger val = new BigInteger(valueStr);
                    BigInteger cnt = new BigInteger(countStr);

                    long valLong = val.longValue(); // 値は整数として扱う想定 (仕様文書: "7,7,7" のような整数列)
                    long cntLong = cnt.longValue();

                    count += cntLong;
                    sum += valLong * cntLong;
                } catch (NumberFormatException e) {
                    // 数式解析に失敗した場合は無視
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
