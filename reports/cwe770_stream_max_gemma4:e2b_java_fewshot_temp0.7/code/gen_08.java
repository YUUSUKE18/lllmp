import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;

        if (line != null) {
            // カンマで分割し、各要素を処理
            for (String part : line.split(",")) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        long n = Long.parseLong(trimmedPart);
                        count++;
                        if (first || n > max) {
                            max = n;
                            first = false;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視
                    }
                }
            }
        }

        // 要素が一つもなかった場合、最大値は定義されない可能性があるため、0を出力するなどの対応が必要だが、
        // 仕様に従い、読み込んだ有効な要素の数と最大値を出す。
        // 最初の入力がない場合は count=0, max=（初期値または適切な値）となる。
        if (count == 0) {
            // 入力が空または無効な場合、maxをどうするか？
            // ここでは読み込んだ有効な要素が0個の場合、最大値を設定しないとして処理を進めるか、
            // または最初の入力がない場合は max を初期値（Long.MIN_VALUE）のままにする。
            // 課題の意図から、少なくとも count は正しく計算されるべき。
            // もし空の入力で何も出力しないことが許容されるならこのままで良いが、
            // 厳密に「最大値」を出力する必要があるため、count=0の場合は max の扱いを明確にする必要がある。
            // 例として、要素が一つもない場合は count=0, max=0 と仮定するか、読み込んだ値に基づいて出力する。
            // 今回は読み込んだ有効な値に基づき出力する。もし何も読み込まれなかったなら max は変わらない。
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
