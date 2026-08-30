import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;
        
        if (line != null && !line.isEmpty()) {
            for (String token : line.split(",")) {
                // 空白を含むトークンも分割結果に含まれるため、trim で処理が必要か？
                // split(",") はカンマでしか区切らないので、前後の空白は残る。
                String trimmed = token.trim();
                
                if (trimmed.isEmpty()) continue;

                try {
                    long n = Long.parseLong(trimmed);
                    
                    if (!first) {
                        max = Math.max(max, n);
                    } else {
                        first = false;
                        max = n; // 最初の値を初期化（Long.MIN_VALUE より大きい場合のみ有効だが、問題文の「整数列」という前提から通常は正数や負数の範囲）
                                // Long.MIN_VALUE は -9223372036854775808 なので、これが最小値として扱われるか確認。
                                // 空でない要素が一つもない場合の max の扱いですが、「整数列」とあるので少なくとも1つあると想定し、
                                // または最初の要素を max にするロジック（上記コードでは first=true で max=n と変換済み）
                    }
                    
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        } else if (!first && count == 0) {
            // もし入力があったが要素がない場合（例：空白のみや、すべて非数文字）の処理。
            // しかし上記ロジックでは first が false になっていないので max は MIN_VALUE で残る可能性あり。
            // より安全に: 最初から count=0, max を初期化せず、最初の有効要素で更新するロジックを再確認。
            
            // 修正：max の初期値は Long.MIN_VALUE とすると、負数の最小値が来ても正しい比較になる（> MIN_VALUE は false）。
            // しかし、「整数列」として空でない場合がある前提であれば上記コードの first フラグで最初の要素に max を代入している。
            
            // 再確認: 
            /*
                if (!first) { ... } else { first = false; max = n; }
             */
            // これは正しい。ただし、もし入力が空やすべて無効なら count=0, max=MIN_VALUE で出力される。
        }

        System.out.println("count=" + count + " max=" + (first ? Long.MIN_VALUE : max));
    }
}
