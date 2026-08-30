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
            token = token.trim();
            if (!token.isEmpty()) {
                try {
                    int num = Integer.parseInt(token);
                    // 重複を除くためにセットに追加し、一意の要素だけカウントするロジックが必要だが、
                    // 問題文は「『重複を除いた整数』について」であるため、
                    // その一意な数値ごとの個数を求める必要がある。
                    // しかし、「重複を除いた」という表現が意図を少し曖昧にする可能性がある。
                    // 解釈: 「入力されたリストから重複を取り除いた後の要素（ユニーク要素）」の総計と個数？
                    // または「各一意の数値について、その出現回数をカウントし、合計する」？
                    // 例文参照: "count=<個数> sum=<合計>" -> これは通常、「異なる整数の種別数」と「それらの和」を意味することが多いが、
                    // 「重複を除いた整数」についてとあるので、「ユニークな数字の数」と「その和」だと解釈するのが自然。
                    // ただし、もし入力に "1, 2, 3" があれば count=3 sum=6.
                    // もし "1, 1, 2" なら count=2 (unique: 1, 2) sum=3? それとも count=3 (all), sum=4?
                    // 「『重複を除いた整数』について」という修飾語句は、対象を「ユニークな数値集合」に限定している。
                    // つまり、「ユニークな数値の個数」と「その和」を求めるのが最も合理的な解釈である。

                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }

        int count = distinctNumbers.size();
        long sum = 0L; // 合計は 64bit で収まるため long を使用
        for (int num : distinctNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
