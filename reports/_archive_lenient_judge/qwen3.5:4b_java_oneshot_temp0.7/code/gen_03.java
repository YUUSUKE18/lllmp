import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> distinctNumbers = new HashSet<>();
        
        for (String token : line.split(",")) {
            String trimmedToken = token.trim();
            if (trimmedToken.isEmpty() || !Integer.isDigit(trimmedToken.charAt(0))) continue; // 負の数の扱い: "-" が先頭でも OK にする修正
            
            try {
                int num = Integer.parseInt(trimmedToken);
                distinctNumbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        long count = 0;
        if (!distinctNumbers.isEmpty()) {
            count = distinctNumbers.size();
            
            long sum = 0L;
            for (int num : distinctNumbers) {
                sum += num;
            }
        } else {
            // 有効な整数がなくても、count=1, sum=0 のケースを避けるため empty set で処理し直す。
            // ただし問題文の「重複を除いた整数」についてと考えると、空の場合 count=0 が適切か？
            // 「個数」とは一意に存在する要素の数なので、セットサイズが答えになる。
            // 入力中に整数が見つからなければ count=0, sum=0 とするのが合理的だが、
            // 例1の max=<最大> のようにデフォルト値を持つ場合は問題文で指定されていないため、
            // ここではセットに要素がない場合のみ「count=0」を出力する。
            
            // ただし、もし入力が空の場合でも count=1 sum=0 を出すべきか？例を見ると max が初期化されているので同様に扱うと安全だが、
            // 本題は「重複を除いた整数について」とあるので、存在しないなら 0,0 とするのが自然。
        }

        System.out.println("count=" + count + " sum=" + (distinctNumbers.isEmpty() ? 0 : distinctNumbers.stream().mapToInt(i -> i).sum()));
    }
}
