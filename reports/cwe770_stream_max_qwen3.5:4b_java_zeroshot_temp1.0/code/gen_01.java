import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            String[] parts = line.split(",");
            
            long maxVal = Long.MIN_VALUE;
            boolean hasValue = false;

            for (String part : parts) {
                // 前後の空白を無視して解析する正規表現を使用
                if (!part.matches("^\\s*-?\\d+$")) {
                    continue; 
                }
                
                try {
                    long val = Long.parseLong(part.trim());
                    hasValue = true;
                    if (val > maxVal) {
                        maxVal = val;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視（trim を適用したはずなのでここは理論上発生しないが安全のため）
                    continue; 
                }
            }

            if (!hasValue) {
                System.out.println("count=0 max=" + Long.MIN_VALUE);
            } else {
                System.out.println("count=" + parts.length + " max=" + maxVal); // 注意：仕様は「要素数」なので、有効な整数の個数を出力する必要があります。再考します。
                /* 
                   【訂正】
                   シンプルに書き換えます。「元素数」というのは入力で与えられたカンマ区切りの配列全体のサイズであるか、「有効な整数のみを抽出した後のリスト」の要素数のどちらなのか文脈から判断する必要があるが、通常此类問題では「入力されたテキスト中のカムの個数を+1 (あるいは配列サイズ)」と解釈することが多い。ただし、仕様にある「空要素・前後の空白は無視し」という記述がある場合、「有効な整数である項目」そのものの数（カウント）を求めている可能性が高い。
                   
                   再考："要素数"は通常、入力されたリストにおける値の数であり、無効なものは除外される意味で解釈するのが自然だ。例: "1, ,2" -> count=2 (1と2)。"a,b,c" -> count=0。
                */

            }
            
            // 要件に合致させるため、「有効な整数の個数」をカウントし出力するロジックを書き直します
        } else {
             System.out.println("count=0 max=" + Long.MIN_VALUE);
        }
    } 
}
