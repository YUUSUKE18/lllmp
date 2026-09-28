import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE; // 64bit integer の最小値として初期化 (ただし、空の場合の処理が必要なので調整する)
        
        if (line != null && !line.isEmpty()) {
            boolean first = true;
            String[] parts = line.split(",");
            for (String part : parts) {
                // 空白を除去し、空でないか確認
                long val;
                try {
                    val = Long.parseLong(part.trim());
                } catch (NumberFormatException e) {
                    continue; // 整数として解釈できない場合は無視
                }

                if (!part.isEmpty()) {
                    count++;
                    if (first || val > max) {
                        max = val;
                        first = false;
                    } else if (!first && val < max) {
                         // 既に最大値が設定されている場合、より小さい場合は更新しない。
                         // ただし、max が Long.MIN_VALUE のままの場合（要素なし）は特殊処理が必要か？
                         // 仕様上「整数列」とあるので少なくとも1つあると想定されるが、安全のために考慮する。
                    } else if (val == max) {
                        // 最大値と同じ場合は count を増やすべきではないので無視。
                        // ただし、「max=<最大値>」という出力形式において、count は要素数なので常にカウントすべきか？
                        // 「それらの『要素数』と『最大値』を求めます」とあるので、有効な整数の個数が count になる。
                    }
                }
            }
        }

        // max がまだ Long.MIN_VALUE の場合（有効な整数が0個の場合）はどうするか？
        // 通常テストケースでは少なくとも1つの数があることが多いですが、安全のために初期値を適切に設定する必要があります。
        // もし count == 0 であれば max は何らかのデフォルト値で出力すべきか、あるいはエラー扱いにするべきか。
        // しかし例題を見ると常に有効なデータがあると想定されているので、count > 0 の場合のみ更新ロジックが機能するようにします。
        
        if (first) {
            // 要素がない場合は max を何にすればよいかわからないが、出力形式に従う必要がある。
            // ここでは count=0 のケースを避ける前提でプログラムを作成する（例題と同様）。
            // もし必須なら Long.MIN_VALUE で出力されるか？あるいは問題文の意図通り「整数列」なので少なくとも1つあると仮定。
        } else {
             if (max == Long.MIN_VALUE) max = 0; // 初期化が不十分だった場合など、安全策として最小値を再設定（実際は上記ロジックで更新されるべき）
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
