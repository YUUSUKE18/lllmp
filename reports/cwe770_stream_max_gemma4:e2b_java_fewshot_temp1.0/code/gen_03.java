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
            for (String s : line.split(",")) {
                String trimmed = s.trim();
                if (!trimmed.isEmpty()) {
                    try {
                        long n = Long.parseLong(trimmed);
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

        // 空の入力が与えられた場合、count=0, max=適切な初期値（ここでは問題の制約を考慮して-1などを選ぶか、最初の要素が存在しない場合の例外処理が必要だが、例に従い最大値計算の結果を出力する）
        if (count == 0) {
            // 要素が全くなかった場合、maxは初期値のままになるが、count=0として出力する。
            // 整数列がない場合はmaxの定義が曖昧になるため、ここでは便宜上 count=0, max=0 または最小値を維持する。
            // 最大値が存在しない場合の慣例に従い、実質的にデータがないことを示す。
            // ただし、問題文は「要素数と最大値」を求めるので、何も入力がなければcount=0で十分。
            max = 0; // 要素がない場合は最大値を0とする（あるいは最小値として扱う）
        }


        System.out.println("count=" + count + " max=" + max);
    }
}
