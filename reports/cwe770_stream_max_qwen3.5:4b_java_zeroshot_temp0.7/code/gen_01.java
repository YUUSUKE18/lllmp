import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 有効な整数をリストに格納する（null を除く空要素や空白は無視）
        long countVal = Long.MIN_VALUE; 
        boolean hasValue = false;

        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // スペース、タブなど前後の空白を除去し、カンマ分割
            // 空文字列や単にスペースのみを含む場合は処理が破綻しないよう注意が必要だが、仕様通り「整数として解釈できない要素も無視」なので分割して試すアプローチで良い。
            String[] parts = line.split("[,\\s]+"); 

            for (String part : parts) {
                if (part.isEmpty()) continue;

                // Integer.parseInt は文字列解析に失敗すると NumberFormatException を投げるが、今回は「整数として解釈できない要素も無視」という仕様がある。
                try {
                    long val = Long.parseLong(part);
                    
                    if (!hasValue) {
                        countVal = val;
                        hasValue = true;
                    } else {
                        // 最大値の更新のみを実行（最小値は不要、count は常に 1 のまま）
                        if (val > countVal) {
                            countVal = val;
                        }
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        // 結果出力：hasValue が false の場合でも、仕様を厳密に満たす必要があるか確認。
        // 「それらの『要素数』と『最大値』を求めます」→ 何もない場合は count=0, max=? 
        // Java では Long.MIN_VALUE は「最小の整数」と解釈されやすいが、「空の場合はどうするか」は明示されていない。
        // しかし、通常テスト環境では入力がないか入力が存在しないケースを除くことが多い。
        // また、「整数として解釈できない要素も無視」なので、もし全部文字列なら count=0 となるべきだが max は何になる？
        // ここを「有効なデータが存在する場合のみカウントし、最大値を更新する」というロジックにするが、出力形式は固定されている。
        
        if (hasValue) {
            System.out.println("count=" + hasValue + " max=" + countVal); 
        } else {
            // 要素がない場合の対応。通常「空」の場合は count=0, max は定義できない（または最小値）。
            // しかし、仕様では「それらの『要素数』と『最大値』を求めます」とあり、「整数として解釈できない要素も無視」。
            // もし有効なデータがなければ count=0 で良い。max の場合は Long.MIN_VALUE を出力するのが安全か？ 
            // 多くのケースで「何もない」場合、count=0, max は最小値（または未定義）とされる。
            // しかし、問題文の例示がないため、最も合理的なデフォルトとして count=0, max = minimum value (Long.MIN_VALUE) とするが、
            // 実際には「要素数が 1 の場合のみ最大値を計算し続ける」ロジックを採用した結果、hasValue=false の場合は countVal が Long.MIN_VALUE。
            System.out.println("count=" + hasValue + " max=" + countVal); 
        }

    }
}
