import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        TreeSet<Long> distinctNumbers = new TreeSet<>();
        HashSet<String> seenStrs = new HashSet<>(); // 重複判定用（文字列レベルで一旦チェック）

        String[] parts = line.trim().split(",");
        
        for (String part : parts) {
            if (!part.isEmpty() && part.matches("-?\\d+")) {
                long val;
                try {
                    val = Long.parseLong(part);
                    
                    // TreeSet は重複が自動除外されるため、直接追加
                    distinctNumbers.add(val); 
                } catch (NumberFormatException e) {
                    continue;
                }
            } else if (!part.isEmpty()) {
                 // 文字列形式で重複を排除しつつ計算するアプローチ（念のため）
                // ただし上記の TreeSet が一意の値しか入ってないなら、単にセットを使うだけで OK です。
                // しかし、「個数を数える」と「合計を合わせる」のは同じ要素が出現し続けたときの話です。
                // 例: "1,2,2,3" -> count=4 ( distinct values の総和 ? いや、質問は '重複を除いた整数' )
                // '重複を除いた整数': {1, 2, 3} という集合に対して個数と合計を求めているのか？ 
                // つまり：ユニークな値の数 + ユニークな値の和
        
        }

        long count = distinctNumbers.size();
        
        BigInteger sumBig = new BigInteger("0");
        for (long val : distinctNumbers) {
            sumBig = sumBig.add(BigInteger.valueOf(val));
        }
        // 合計が正負で、符号を考慮して文字列に直す必要があるか？ 
        // Java の toString は +/- を正确处理するので問題ありません。

        long totalSum;
        try {
             totalSum = sumBig.longValue(); // BigInteger が fits in Long のケースは想定しているようですが、BigInteger で安全に出すなら直接出力します。ただし問題文「合計を 64bit 整数の範囲に収めます」という前提がありますので longで OK です。(実際には文字列表示が簡単ですが、long変換後計算すると精度落ちやオーバーフローリスク？ BigInteger を使うのは安全です)
             // しかし、「sum=」という形式なので int に直すと正負の問題が出てくるかもしれませんが問題文の仕様通り 64bit で収まるとありますので long のまま出力します。

        } catch (Exception e){} 
        
        System.out.println("count=" + count + " sum=" + totalSum);
    } 
}
