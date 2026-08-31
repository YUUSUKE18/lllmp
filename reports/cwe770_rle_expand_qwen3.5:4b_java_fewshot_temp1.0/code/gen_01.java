import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.util.StringTokenizer;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        // TreeMap のキーとして BigInteger を使って、整数部分ごとに統合する (重複の出現回数を足す)
        // キー: 整数値 (BigInteger), バリュー: その数値に何回現れるか (long)
        // ただし問題文の「7:3,2:2」のような解析は StringTokenizer で分割し、キーとバリューを BigInteger に変換して足し合わせる。
        TreeMap<Integer, Long> countMap = new TreeMap<>();

        StringTokenizer st = new StringTokenizer(line);
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            try {
                // ": " 区切りで値と回数を区別する
                int colonIndex = token.indexOf(':');
                if (colonIndex < 0 || colonIndex >= token.length() - 1) {
                    continue; // 形式が異なる場合無視
                }

                String valStr = token.substring(0, colonIndex);
                String countStr = token.substring(colonIndex + 1).trim();

                if (valStr.isEmpty() || countStr.isEmpty()) {
                    continue; // 値や回数が空の場合無視
                }

                BigInteger valueBi = new BigInteger(valStr);
                long value = valueBi.longValue(); // 整数として取り出す。BigInteger を使用するため overflow のリスクは低いが、計算時に BigInteger に戻すのが安全。
                // 実際には値そのものが 64bit 範囲に収まると言われていますが、計算（合計）は BigInteger で行うのが安全です。
                
                // ここで value に基づいて countMap を更新
                // しかし、問題文の「7:3」なら値=7 が 3 回現れるという解釈と、要素数+1 と合計+=7 の両方を考慮する必要があります。
                // "count" は distinct な数種の数が存在する個数を指すのか、展開したリスト全体のサイズか？
                // 例 1) 課題の最大値のような文脈から「要素数」はリストの長さ（展開後のサイズ）を意味しそうです。
                // しかし、「ランレングス圧縮列」として「7:3,2:2」が与えられる場合、この形式自体で「重複を排除した要素の数（kind count）」と「合計」を求めるのか、それとも「展開後の要素数」と「合計」を求めるのか？
                // 通常、ランレングス圧縮列の解析問題では、「distinct elements」(种类) と「sum of values」を求めることが多いですが、
                // ここでは「要素数」と「合計」を求めます。日本語で「要素数」と言うとリストの長さ (count) が一般的です。
                // ただし、入力形式が「値:回数」となっている場合、「7:3」は 7 のみが 1 つの要素として存在するのではなく、7 が 3 回繰り返されると解釈できますか？
                // もし「7:3」という文字列そのものが 1 つのデータ点であるとして「重複を除いた要素の数 (unique kinds)」をカウントし、「各値×回数」で合計したものを求める場合が最も自然な推測です。
                // なぜなら、「7,7,7」は「要素数=3」になりますが、入力形式が「7:3」となっているので、これは「要素 1(7) が出現 3 回」を表し、「要素数」が 1 と考えられるから です。
                
                // 再考：例文の文脈を再確認
                // 「7:3,2:2 は 7,7,7,2,2 という整数列を表します。」
                // ここでは「要素数」とは、展開後のリスト全体のサイズ (7,7,7,2,2 -> 5 個) を指すのか？それとも (7, 2 -> 2 種類) を指すのか？
                // 多くの競プログラミングの文脈で、「ランレングス圧縮列」に対して「要素数」と言われることは稀です。「種類の数（distinct count）」が一般的です。
                // しかし、もし「要素数 = 展開後の長さ」を求めるとすると、計算は単純に Σ(repeat) です。
                // 「要素数」を「展開後の長さ」と解釈する場合：count = Σ(counts), sum = Σ(value * count)
                // 「要素数」を「重複を除いた個数（kind）」と解釈する場合：count = keys.size(), sum = Σ(value * count)
                // 問題文には明確に「要素数」とありますが、入力形式が「値:回数」なので、「7:3」という単一のトークンが「1 つの要素 (value=7)」を表し、その「出現回数は別のこと」と捉えるのが自然な言語処理の問題の解法です。
                // もし「7:3」というものを 1 つのデータとして受け取ったなら、それは「値」だけであり、「回数」はメタデータです。
                // したがって、「要素数」は「異なる値の個数 (distinct count)」と解釈するのが妥当だと判断します。
                
                if (!countMap.containsKey(value)) {
                    countMap.put((int)value, 0L);
                }
                countMap.put((int)value, countMap.get((int)value) + 1L); // 出現回数をカウントし、ここで distinct な個数と合計に利用する
                // ここで行うのが「distinct count」の計算ですね。
            } catch (Exception e) {
                // 解析エラーの場合無視
            }
        }

        long sum = 0;
        for (int key : countMap.keySet()) {
            sum += key * countMap.get(key);
        }
        
        System.out.println("count=" + countMap.size() + " sum=" + sum);
    }
}
