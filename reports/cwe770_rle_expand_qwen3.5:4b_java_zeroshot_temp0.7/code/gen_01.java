import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            System.out.println("count=0 sum=0");
            return;
        }

        String input = scanner.nextLine();
        Pattern pattern = Pattern.compile("\\d+:\\s*(\\d+)");
        Matcher matcher = pattern.matcher(input);
        
        long count = 0;
        long sum = 0;

        while (matcher.find()) {
            long value = Long.parseLong(matcher.group(1));
            // 回数はパターンに指定されていないが、値の出現回数を処理する必要はないので、
            // 問題文の「要素数」と「合計」を求めよという要件に基づき、
            // 値:回数 の形式にある「回数」は実際に整数列として追加する必要がない場合と解釈するか、
            // または「7:3,2:2」が 7,7,7,2,2 を表すとあるので、回数は考慮する必要がある。
            
            // しかし、入力形式は「値:回数」とあり、その後の処理で「整数列」を形成するので、
            // 入力の文字列解析から直接「回数」を取得する必要がある。
            // 上記の Pattern は "数字 : スペース (数字)" を捉えるが、"回数" がスペース後にあるかどうかわからない。
            // 再考: 問題文の例 `7:3,2:2` は、7 の回数が 3、2 の回数が 2 を意味する。
            // Java スキーマでこれを解析するには regex で "値:(回数)" と捉える。
            // 空白を許容するため、"数字 : (スペース? 非空白文字序列)" とする。
            
            // 修正: 入力形式は厳密に `値:回数` とされるが、前後の空白やカンマ区切りである。
            // 各項目は `数値:(数値)` の形。
            // Scanner で分割して解析するのが安全だが、問題文では「`値:回数` をカンマ区切りで並べた」としている。
            // 例: "7:3,2:2" -> ["7:3", "2:2"]
            
            // 簡易的に全文字をスキャンして `:` を境に数値と回数を抽出する。
        }

        // 再実装: スペースやカンマを無視して、`値:回数` の形のものだけを抽出する。
        // Pattern.compile("[0-9]+:(?=[0-9]+)") という形式で区切るのではなく、
        // 文字列を区切るとともに、正則表現でパースするのが適切。
        
        // 修正: 問題文の「`値:回数`」と「整数列」の関係。
        // `7:3,2:2` -> 7,7,7,2,2
        // つまり、回数は実際に整数列への追加数である。
        // しかし、入力が "7:3,2:2" という文字列の場合、回数の値は "3" と "2" となる。
        // したがって、解析ロジックは以下の通り。
        
        // 入力文字列をカンマで分割し、各要素を解析する。
        String[] parts = input.split(",");
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            
            // `値:回数` の形式を確認
            int colonIndex = part.indexOf(':');
            if (colonIndex == -1 || colonIndex < 1) continue; // 正しくない形式
            
            String valueStr = part.substring(0, colonIndex).trim();
            String countStr = part.substring(colonIndex + 1).trim();
            
            try {
                long value = Long.parseLong(valueStr);
                long repeatCount = Long.parseLong(countStr);
                
                if (repeatCount < 0) continue; // 回数は 0 以上
                
                for (long i = 0; i < repeatCount; i++) {
                    sum += value;
                    count++;
                }
            } catch (NumberFormatException e) {
                // 無効な要素は無視
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
