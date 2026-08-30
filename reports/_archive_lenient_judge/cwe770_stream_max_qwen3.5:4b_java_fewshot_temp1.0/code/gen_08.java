import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Locale;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long maxVal = Long.MIN_VALUE; // 初期値は最小のlongで、実際に整数が入るなら更新されるように (または空の場合でも処理できるようにするため) 
        int count = 0;
        boolean hasInput = false;

        if (line != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                String trimmed = part.trim();
                try {
                    long n = Long.parseLong(trimmed); // Locale.US を指定して小数点の解析防止（オプション）が安全だが、整数であればデフォルトでも可。ただし日本語入力が試行錯誤しやすいので明示的でない限り問題ないが、「空白区切りの整数列」という例と異なり「カンマ区切り」なので、数式として処理する
                    if (hasInput) { // 最初の要素は max の初期値より大きいことが保証されるわけではないが、比較演算子は安全であるためそのまま可。ただし long.MIN_VALUE を初期にした場合、実際の値が入ってくれば必ず更新されうる。もし本当に空のケースがあるか分からないなら Long.MAX_VALUE にして「最初に入ってきたもの」を設定するか、「最初の有効な数」を設定する必要がある
                        if (n > maxVal) {
                            maxVal = n;
                        }
                    } else { // 第一要素の場合、max をその値に設定
                        maxVal = n;
                    }
                    hasInput = true;
                } catch (NumberFormatException e) {
                    // 無視する
                }
            }
        }

        if (!hasInput) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
